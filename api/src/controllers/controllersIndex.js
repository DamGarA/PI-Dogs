const { Dog, Temperament } = require("../db.js")
const { API_KEY } = process.env

const getDogs =  () => {
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
                    image: dog.image.url
                }
            })

            return Dog.findAll().then(dbDogs => {
                const allDogs = dbDogs.concat(api_dogs)
                return allDogs
            })
            
        })
}

module.exports = {
    getDogs
}
