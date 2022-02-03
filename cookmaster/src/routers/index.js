const express = require('express');

const router = express.Router();

const controllers = require('../controllers');
const middlewares = require('../middlewares');

router.post('/users', controllers.createUser);
router.post('/users/admin', middlewares.authAdmin, controllers.createUser);
router.post('/login', controllers.login);
router.post('/recipes', middlewares.auth, controllers.createRecipe);
router.get('/recipes/:id', controllers.getRecipeByID);
router.get('/recipes', controllers.getAllRecipes);
router.put('/recipes/:id', middlewares.auth, controllers.upadateRecipe);
router.delete('/recipes/:id', middlewares.auth, controllers.deleteRecipe);
router.put(
  '/recipes/:id/image/',
  middlewares.auth,
  middlewares.multer,
  controllers.addImage,
);

module.exports = router;
