const { Router } = require('express');
const { getDogs } = require('../controllers/controllersIndex.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Dog, Temperament } = require("../db.js")
const { API_KEY } = process.env


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", async (req, res) => {
    try {
       const allDogs = await getDogs()
        res.json({message: "Todos los perros", lista: allDogs})    
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
})

router.post('/dogs', async (req, res) => {
    const {name, heigth, weight, life_span} = req.body;
    try {
        if (!name || !heigth || !weight) return res.status(400).send('Faltan datos para crear');
        const newDog = await Dog.create({name, heigth, weight, life_span})
        return res.json({message: "Se creo correctamente", dog: newDog})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
})

router.post('temperaments', async (req, res) => {
    const {name} = req.body
    try {
        const newTemperament = await Temperament.create({name})
        res.json({mess: "creado", temperament: newTemperament})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})


module.exports = router;
