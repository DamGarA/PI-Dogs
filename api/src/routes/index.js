const { Router } = require('express');
const { getDogs, getRace, getRacesById, getTemperaments, postRace } = require('../controllers/controllersIndex.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Dog, Temperament } = require("../db.js")
const { API_KEY } = process.env


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", async (req, res) => {
    const { name } = req.query
    try {
       if (!name) {
         const allDogs = await getDogs()
        res.json({message: "Todos los perros", lista: allDogs}) 
    } else {
        const raceDogs = await getRace(name)
        res.json({message: 'Resultados de la busqueda', lista: raceDogs}) 
    }
          
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
})

router.get('/dogs/:id', async (req, res) => {
    const { id } = req.params
    try {
        const detail = await getRacesById(id)
        if (!detail) return res.status(400).json({error: "Race not found"})
        return res.json({message: "Search results", race: detail})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
})

router.post('/dogs', async (req, res) => {
    const {name, heigth, weight, life_span, temperaments} = req.body;
    try {
        if (!name || !heigth || !weight) return res.status(400).send('Faltan datos para crear');
        const newDog = await postRace(name, heigth, weight, life_span, temperaments)
        return res.json({message: "Se creo correctamente", dog: newDog})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
})

router.get('/temperaments', async (req, res) => {
    try {
        const temperamentsList = await getTemperaments()
        res.json({message: "Temperament list", temperaments: temperamentsList})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})


module.exports = router;
