const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerDogs = require('./routerDogs.js');
const routerTemperaments = require('./routerTemperaments.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", routerDogs)
router.use("/temperaments", routerTemperaments)


module.exports = router;