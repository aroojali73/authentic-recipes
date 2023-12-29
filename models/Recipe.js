const db = require('../config/database');

const Recipe = {
    // Create a new recipe
    create: (recipeData, callback) => {
        const query = "INSERT INTO Recipes (title, description, ingredients, instructions, story, user_id) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(query, [recipeData.title, recipeData.description, recipeData.ingredients, recipeData.instructions, recipeData.story, recipeData.userId], callback);
    },

    // Retrieve all recipes
    findAll: (callback) => {
        const query = "SELECT * FROM Recipes";
        db.query(query, callback);
    },

    // Retrieve a single recipe by id
    findById: (id, callback) => {
        const query = "SELECT * FROM Recipes WHERE id = ?";
        db.query(query, [id], callback);
    },

    // Update a recipe
    update: (id, recipeData, callback) => {
        const query = "UPDATE Recipes SET title = ?, description = ?, ingredients = ?, instructions = ?, story = ? WHERE id = ?";
        db.query(query, [recipeData.title, recipeData.description, recipeData.ingredients, recipeData.instructions, recipeData.story, id], callback);
    },

    // Delete a recipe
    delete: (id, callback) => {
        console.log('Executing delete in the database for ID:', id);
        const query = "DELETE FROM Recipes WHERE id = ?";
        db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Error executing delete query:', err);
            } else {
                console.log('Delete query result:', results);
            }
            callback(err, results);
        });
    },

    deleteRelatedRatingsAndReviews: (recipeId, callback) => {
        // SQL to delete related ratings and reviews
        const deleteRatings = "DELETE FROM ratings WHERE recipe_id = ?";
        const deleteReviews = "DELETE FROM reviews WHERE recipe_id = ?";
    
        // Execute these queries
        db.query(deleteRatings, [recipeId], (err, results) => {
            if (err) return callback(err);
    
            db.query(deleteReviews, [recipeId], callback);
        });
    },

    // Retrieve recipes by user id
    findByUserId: (userId, callback) => {
        const query = "SELECT * FROM Recipes WHERE user_id = ?";
        db.query(query, [userId], callback);

    },
    
        // Get average rating for a recipe
    getAverageRating: (recipeId, callback) => {
        const query = "SELECT AVG(rating) AS averageRating FROM ratings WHERE recipe_id = ?";
        db.query(query, [recipeId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const averageRating = results[0].averageRating || 0;
            callback(null, averageRating);
        });
    },

    // Get all reviews for a recipe
    getReviews: (recipeId, callback) => {
        const query = "SELECT * FROM reviews WHERE recipe_id = ?";
        db.query(query, [recipeId], callback);
    },

    saveRating: (recipeId, userId, rating, callback) => {
        // SQL query to insert/update rating
        const query = "INSERT INTO ratings (recipe_id, user_id, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?";
        db.query(query, [recipeId, userId, rating, rating], callback);
    },

    saveReview: (recipeId, userId, comment, callback) => {
        const query = "INSERT INTO reviews (recipe_id, user_id, comment) VALUES (?, ?, ?)";
        db.query(query, [recipeId, userId, comment], callback);
    }
};

module.exports = Recipe;
