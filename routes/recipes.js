const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Route to display the Add Recipe form
router.get('/add', recipeController.getAddRecipePage);

// Route to handle the Add Recipe form submission
router.post('/add', recipeController.addRecipe);

router.get('/:id', recipeController.getRecipeById);
router.get('/edit/:id', recipeController.getEditRecipePage);
router.post('/edit/:id', recipeController.updateRecipe);
// In recipes.js

router.post('/delete/:id', recipeController.deleteRecipe);

router.get('/recipes/:id', (req, res) => {
    // Logic to fetch recipe data from the database
    Recipe.findById(req.params.id, (err, recipe) => {
        if (err) {
            // Handle errors
            return res.status(500).send('Error fetching recipe');
        }
        res.render('recipe', { recipe: recipe });
    });
});

// Corrected route for submitting a rating
router.post('/:id/rate', recipeController.rateRecipe);

// Corrected route for submitting a review
router.post('/:id/review', recipeController.submitReview);

// recipes.js

router.get('/test', (req, res) => {
    res.send('Test route is working');
});


module.exports = router;
