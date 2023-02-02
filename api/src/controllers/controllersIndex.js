const { Dog, Temperament } = require("../db.js")
const { API_KEY } = process.env
const { Op } = require('sequelize')

//busca todas las razas
const getDogs = () => {
    //pide los perros a la API
    return fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            //convierte las razas recibidas a la estructura necesaria
            const api_dogs = data.map(dog => {
                return {
                    id: dog.id + 300,
                    name: dog.name,
                    height: dog.height.metric,
                    weight: dog.weight.metric,
                    life_span: dog.life_span,
                    image: dog.image.url,
                    temperaments: dog.temperament
                }
            })
            //dentro de ese then busco los perros de la base de datos
            return Dog.findAll({
                include: [{
                    model: Temperament,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }]
            }).then(dbDogs => {
                //ajusta el formato de los temperamentos, que vienen en array. Se pasan a string
                if (dbDogs.length > 0) {
                    let temp = ""
                    dbDogs.forEach(dog => {
                        dog.dataValues.temperaments.forEach(obj => {
                                if (temp == "") temp = temp + obj.dataValues.name
                                else temp = temp + ", " + obj.dataValues.name      
                    })
                        dog.dataValues.temperaments = temp
                        temp = ""
                    })
                }
                //concatenamos ambos grupos de razas
                const allDogs = dbDogs.concat(api_dogs)
                return allDogs
            })   
        })
}

//busca razas por nombre
const getRace = (search) => {
    //pide todas las razas a la API
    return fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        //hace un filter buscando las coincidencias entre las razas y el search buscado
        const racesApi = data.filter(dog => dog.name.toUpperCase().includes(search.toUpperCase()))
        const racesApiModel = racesApi.map(dog => {
            //les da el formato requerido a las razas pedidas
            return {
                id: dog.id + 300,
                name: dog.name,
                height: dog.height.metric,
                weight: dog.weight.metric,
                life_span: dog.life_span,
                image: dog.image.url,
                temperaments: dog.temperament
            }
        })
        //adentro de esa promesa todas las razas que coincidan con el search buscado
        return Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            },
            include: [{
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }]
        }).then(dbDogs => {
            //pone los temperamentos en el formato requerido (string)
            if (dbDogs.length > 0) {
                let temp = ""
                dbDogs.forEach(dog => {
                    dog.dataValues.temperaments.forEach(obj => {
                        if (temp == "") temp = temp + obj.name
                        else temp = temp + ", " + obj.name
                })
                    dog.dataValues.temperaments = temp
                })
            }
            //concatena ambos arrays
            const allRaces = dbDogs.concat(racesApiModel)
            if (allRaces.length > 0) return allRaces
            else throw Error('Not found races')
        })  
    })
}

//busca las razas por ID
const getRacesById = (id) => {
    //pide todas las razas
    return fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            //busca coincidencia del ID dentro de las razas obtenidas de la API
            const api_race = data.find(dog => dog.id + 300 == id)
            //si la encuentra devuevle el objeto encontrado
            if (api_race) {
                    return {
                        id: api_race.id + 300,
                        name: api_race.name,
                        height: api_race.height.metric,
                        weight: api_race.weight.metric,
                        life_span: api_race.life_span,
                        image: api_race.image.url,
                        temperaments: api_race.temperament
                    }
            } else {
                //si no lo encontró entre las razas de la API lo busca en la base de datos
                return Dog.findByPk(id, {
                    include: [{
                        model: Temperament,
                        attributes: ["name"],
                        through: {
                            attributes: []
                        }
                    }]
                }).then(race => {
                    //da a los temperamentos el formato requerido (string)
                    let temp = ""
                        race.dataValues.temperaments.forEach(obj => {
                            if (temp == "") temp = temp + obj.name
                            else temp = temp + ", " + obj.name
                    })
                        race.dataValues.temperaments = temp
                    
                    return race
                })
            }       
    })
}

//obtiene todos los temperamentos
// const getTemperaments = async () => {
//     //busca todas las razas de la API
//     const response = await fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    
//     //los transforma a json
//     const data = await response.json();
    
//     //si la raza tiene temperamento hace un split para devolver un array de ellos. hace flatmap para sacar los corchetes y que quede un array de un solo nivel. el set saca los repetidos
//     const temperaments = [
//         ...new Set(
//           data.flatMap(race => race.temperament ? race.temperament.split(", ") : [])
//         )
//       ];

//       //se busca los temperamentos para ver si ya existen y sino los crea. esto es para que no se repitan
//     const promises = temperaments.map(async name => {
//         const [temperament] = await Temperament.findOrCreate({ where: { name } });
//         return temperament;
//     });
//     //espera los resultados de todas las promesas generadas por el map anterior
//     const results = await Promise.all(promises);
//     return results;
// }

const getTemperaments = () => {
    //se piden las razas a la API
    return fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        //si la raza tiene temperamento hace un split para devolver un array de ellos. hace flatmap para sacar los corchetes y que quede un array de un solo nivel. el set saca los repetidos
        const temperaments = [
          ...new Set(
            data.flatMap(race => race.temperament ? race.temperament.split(", ") : [])
          )
        ];
         //se busca los temperamentos para ver si ya existen y sino los crea. esto es para que no se repitan
        const promises = temperaments.map(name => {
          return Temperament.findOrCreate({ where: { name } })
            .then(([temperament]) => temperament);
        });
        //espera los resultados de todas las promesas generadas por el map anterior
        return Promise.all(promises);
      });
};

//crear una raza
const postRace = (name, height, weight, life_span, temperaments, image) => {
    //crea la raza
    return Dog.create({ name, height, weight, life_span, image })
      .then(race => {
        const temperamentInstances = [];
        //guarda las promesas de todas las busquedas de temperamentos enviados
        const promises = temperaments.map(temp => {
          const temper = temp[0].toUpperCase() + temp.slice(1).toLowerCase();
          return Temperament.findOne({ where: { name: temper } })
            .then(temperament => {
              temperamentInstances.push(temperament);
            });
        });
        //espera a que se resuelvan todas las promesas para relacionar los temperamenos con la raza recien creada
        return Promise.all(promises)
          .then(() => race.setTemperaments(temperamentInstances))
          .then(() => {
            //busca la raza ya relacionada para devolverla
            return Dog.findByPk(race.id, {
              include: [{
                model: Temperament,
                attributes: ["id", "name"],
                through: {
                  attributes: []
                }
              }]
            });
          });
      });
};
  
//borra una raza
const deleteRace = async (id) => {
    const dog = await Dog.findByPk(id);
    if (!dog) throw new Error('Breed Not Found');
    await dog.destroy();
};

//se actualiza la raza
// const updateRace = async (id, name, height, weight, life_span, temperaments, image) => {
//     //se busca la raza por ID
//     const dog = await Dog.findByPk(id);
//     if (!dog) throw new Error('Breed not found');
    
//     //se setean las propiedades enviadas
//     dog.name = name;
//     dog.height = height;
//     dog.weight = weight;
//     dog.life_span = life_span;
//     dog.image = image;

//     //se actualizan
//     await dog.save();

//     //si se enviaron temperamentos...
//     if (temperaments) {
//         const temperamentInstances = [];

//         //por cada uno de los temperamentos...
//         for (const temp of temperaments) {

//             //se les da el formato necesario...
//             const temper = temp[0].toUpperCase() + temp.slice(1).toLowerCase();

//             //se lo busca en la base de datos...
//             const temperament = await Temperament.findOne({ where: { name: temper } });

//             //y se ingresa en el array para relacionar...
//             temperamentInstances.push(temperament);
//         }
//         //se realacionan los temperamentos guardados
//         await dog.setTemperaments(temperamentInstances);
//     }

//     //se busca la raza recien actualizada
//     const updatedDog = await Dog.findByPk(dog.id, {
//         include: [{
//             model: Temperament,
//             attributes: ["id", "name"],
//             through: {
//                 attributes: []
//             }
//         }]
//     });
//     return updatedDog;
// };

const updateRace = (id, name, height, weight, life_span, temperaments, image) => {
    //se busca la raza por ID
    return Dog.findByPk(id)
        .then(dog => {
            if (!dog) throw new Error("Breed not found");
            //se modifican las propiedades y se actualiza
            dog.name = name;
            dog.height = height;
            dog.weight = weight;
            dog.life_span = life_span;
            dog.image = image;
            return dog.save();
        })
        .then(dog => { //se buscan todos los temperamentos en la base de datos
            return Promise.all(
            temperaments.map(temp => {
                const temper = temp[0].toUpperCase() + temp.slice(1).toLowerCase();
                return Temperament.findOne({ where: { name: temper } });
                })
            )
            .then(temperamentInstances => { //se setean los temperamentos
            return dog.setTemperaments(temperamentInstances);
            })
            .then(() => { //se busca la raza actualizada para devolver
                return Dog.findByPk(dog.id, {
                    include: [{
                        model: Temperament,
                        attributes: ["id", "name"],
                        through: {
                         attributes: []
                        }
                    }]
                });
            });
        });
};
  

module.exports = {
    getDogs,
    getRace,
    getRacesById,
    getTemperaments,
    postRace,
    deleteRace,
    updateRace
}
