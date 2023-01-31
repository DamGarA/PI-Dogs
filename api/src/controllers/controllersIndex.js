const { Dog, Temperament } = require("../db.js")
const { API_KEY } = process.env
const { Op } = require('sequelize')

const getDogs =  async () => {
    return fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
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
            return Dog.findAll({
                include: [{
                    model: Temperament,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }]
            }).then(dbDogs => {
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
                const allDogs = dbDogs.concat(api_dogs)
                return allDogs
            })   
        })
}

const getRace = async (search) => {
    return fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        const racesApi = data.filter(dog => dog.name.toUpperCase().includes(search.toUpperCase()))
        const racesApiModel = racesApi.map(dog => {
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
            const allRaces = dbDogs.concat(racesApiModel)
            if (allRaces.length > 0) return allRaces
            else throw Error('Not found races')
        })  
    })
}

const getRacesById = async (id) => {
    return fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const api_race = data.find(dog => dog.id + 300 == id)
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
                return Dog.findByPk(id, {
                    include: [{
                        model: Temperament,
                        attributes: ["name"],
                        through: {
                            attributes: []
                        }
                    }]
                }).then(race => {
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

const getTemperaments = async () => {
    const response = await fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const data = await response.json();
    const temperaments = [
        ...new Set(
          data.flatMap(race => race.temperament ? race.temperament.split(", ") : [])
        )
      ];
    const promises = temperaments.map(async name => {
        const [temperament] = await Temperament.findOrCreate({ where: { name } });
        return temperament;
    });
    const results = await Promise.all(promises);
    return results;
}

const postRace = async (name, height, weight, life_span, temperaments, image) => {
    const race = await Dog.create({name, height, weight, life_span, image})
    const temperamentInstances = []
    for (const temp of temperaments) {
        const temper = temp[0].toUpperCase() + temp.slice(1).toLowerCase()
        const temperament = await Temperament.findOne({ where: { name: temper } });
        temperamentInstances.push(temperament)
    }
    await race.setTemperaments(temperamentInstances)
    const showRace = await Dog.findByPk(race.id, {
        include: [{
            model: Temperament,
            attributes: ["id", "name"],
            through: {
                attributes: []
            }
        }]
    })
    return showRace
}

const deleteRace = async (id) => {
    const dog = await Dog.findByPk(id);
    if (!dog) throw new Error('Breed Not Found');
    await dog.destroy();
};

const updateRace = async (id, name, height, weight, life_span, temperaments, image) => {
    const dog = await Dog.findByPk(id);
    if (!dog) throw new Error('Breed not found');
    dog.name = name;
    dog.height = height;
    dog.weight = weight;
    dog.life_span = life_span;
    dog.image = image;
    await dog.save();
    if (temperaments) {
        const temperamentInstances = [];
        for (const temp of temperaments) {
            const temper = temp[0].toUpperCase() + temp.slice(1).toLowerCase();
            const temperament = await Temperament.findOne({ where: { name: temper } });
            temperamentInstances.push(temperament);
        }
        await dog.setTemperaments(temperamentInstances);
    }
    const updatedDog = await Dog.findByPk(dog.id, {
        include: [{
            model: Temperament,
            attributes: ["id", "name"],
            through: {
                attributes: []
            }
        }]
    });
    return updatedDog;
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
