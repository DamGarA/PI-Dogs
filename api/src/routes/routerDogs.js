const { Router } = require('express');
const { getDogs, getRace, getRacesById, postRace, deleteRace, updateRace } = require('../controllers/controllersIndex.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
    const { name } = req.query
    try {
        //si no recibe el nombre manda todos los perros
       if (!name) {
         const allDogs = await getDogs()
        res.json({message: "Todos los perros", lista: allDogs}) 
    } else {
        //si recibe el nombre, lo busca
        const raceDogs = await getRace(name)
        res.json({message: 'Resultados de la busqueda', lista: raceDogs}) 
    }
          
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const detail = await getRacesById(id)
        if (!detail) return res.status(400).json({error: "Race not found"})
        return res.json({message: "Search results", race: detail})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
})

router.post('/', async (req, res) => {
    const {name, height, weight, life_span, temperaments, image} = req.body;
    try {
        if (!name || !height || !weight) return res.status(400).send('Faltan datos para crear');
        const newDog = await postRace(name, height, weight, life_span, temperaments, image)
        return res.json({message: "Se creo correctamente", dog: newDog})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteRace(id);
        return res.json({ message: 'Delete Breed!' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, height, weight, life_span, temperaments, image } = req.body;
    try {
        const updatedDog = await updateRace(id, name, height, weight, life_span, temperaments, image);
        return res.json({ message: 'Breed Updated Correctly!', dog: updatedDog });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});


module.exports = router;
