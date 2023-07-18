const { Router } = require('express');
const { getRecipesById, getRecipesByName, postRecipes} = require ('../controllers/RecCon');
const { getAllDiets } = require('../controllers/DietCon');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

router.get('/recipes/:idRecipe', getRecipesById);
router.get('/recipes', postRecipes);
router.get('/recipes/name?="..."', getRecipesByName);
router.get('/diets', getAllDiets);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
