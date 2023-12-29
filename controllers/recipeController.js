const Recipe = require('../models/Recipe');
const User = require('../models/User');

// Display the Add Recipe form
exports.getAddRecipePage = (req, res) => {
    res.render('add-recipe');
};

// Add a new recipe
exports.addRecipe = (req, res) => {
    const { title, description, ingredients, instructions, story } = req.body;
    const userId = req.session.userId; // Ensure session is properly set up
    const recipeData = { title, description, ingredients, instructions, story, userId };

    Recipe.create(recipeData, (err, result) => {
        if (err) {
            console.error('Error adding recipe:', err);
            return res.status(500).send('Error adding recipe');
        }
        res.redirect('/recipes/' + result.insertId);
    });
};

// Display a single recipe along with its ratings and reviews
exports.getRecipeById = (req, res) => {
    const recipeId = req.params.id;

    Recipe.findById(recipeId, (err, recipe) => {
        if (err || !recipe) {
            return res.status(404).send('Recipe not found');
        }

        // Fetch and append ratings and reviews
        Recipe.getAverageRating(recipeId, (err, averageRating) => {
            if (err) {
                // Handle error
                return res.status(500).send('Error retrieving rating');
            }

            Recipe.getReviews(recipeId, (err, reviews) => {
                if (err) {
                    // Handle error
                    return res.status(500).send('Error retrieving reviews');
                }

                // Render recipe view with recipe data, ratings, and reviews
                res.render('recipe', { recipe: recipe, averageRating, reviews });
            });
        });
    });
};

// Display the Edit Recipe form
exports.getEditRecipePage = (req, res) => {
    const recipeId = req.params.id;

    Recipe.findById(recipeId, (err, recipe) => {
        if (err || !recipe) {
            return res.status(404).send('Recipe not found');
        }
        res.render('edit-recipe', { recipe: recipe });
    });
};

// Update a recipe
exports.updateRecipe = (req, res) => {
    const recipeId = req.params.id;
    const updatedData = req.body;

    Recipe.update(recipeId, updatedData, (err, result) => {
        if (err) {
            console.error('Error updating recipe:', err);
            return res.status(500).send('Error updating recipe');
        }
        res.redirect('/recipes/' + recipeId);
    });
};

// In recipeController.js

exports.deleteRecipe = (req, res) => {
    const recipeId = req.params.id;

    // First, delete related ratings and reviews
    Recipe.deleteRelatedRatingsAndReviews(recipeId, (err) => {
        if (err) {
            console.error('Error deleting related ratings and reviews:', err);
            return res.status(500).send('Error deleting related data');
        }

        // Then, delete the recipe
        Recipe.delete(recipeId, (err) => {
            if (err) {
                console.error('Error deleting recipe:', err);
                return res.status(500).send('Error deleting recipe');
            }
            res.redirect('/users/profile');
        });
    });
};


// Submit a review
exports.submitReview = (req, res) => {
    const userId = req.session.userId; // Assuming you store the user's ID in the session
    const recipeId = req.params.id;
    const { comment } = req.body;

    // Assuming you have a method in your Recipe model to save a review
    Recipe.saveReview(recipeId, userId, comment, (err) => {
        if (err) {
            console.error('Error submitting review:', err);
            return res.status(500).send('Error submitting review');
        }
        res.redirect('/recipes/' + recipeId);
    });
};

exports.rateRecipe = (req, res) => {
    const recipeId = req.params.id;
    const rating = req.body.rating;
    const userId = req.session.userId; // Assuming you store the user's ID in the session

    // Logic to save the rating to the database
    // This might involve a call to a method in your Recipe model
    Recipe.saveRating(recipeId, userId, rating, (err, result) => {
        if (err) {
            // Handle error (e.g., render an error page or send a response)
            console.error('Error saving rating:', err);
            return res.status(500).send('Error saving rating');
        }

        // Redirect to the user's profile after successful rating submission
        res.redirect('/users/profile');
    });
};
