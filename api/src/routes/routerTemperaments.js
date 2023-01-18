const { Router } = require('express');
const { getTemperaments } = require('../controllers/controllersIndex.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const temperamentsList = await getTemperaments()
        res.json({message: "Temperament list", temperaments: temperamentsList})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})


module.exports = router;