const db = require('../config/database');

const User = {
    create: (userData, callback) => {
        const query = "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)";
        db.query(query, [userData.username, userData.email, userData.password], callback);
    },
    findByUsername: (username, callback) => {
        const query = "SELECT * FROM Users WHERE username = ?";
        db.query(query, [username], callback);
    },
    // New update method
    update: (id, userData, callback) => {
        const query = "UPDATE Users SET username = ?, email = ? WHERE id = ?";
        db.query(query, [userData.username, userData.email, id], callback);
    },
        // Submit a rating for a recipe
    submitRating: (userId, recipeId, rating, callback) => {
        const query = "INSERT INTO ratings (user_id, recipe_id, rating) VALUES (?, ?, ?)";
        db.query(query, [userId, recipeId, rating], callback);
    },

    // Submit a review for a recipe
    submitReview: (userId, recipeId, comment, callback) => {
        const query = "INSERT INTO reviews (user_id, recipe_id, comment) VALUES (?, ?, ?)";
        db.query(query, [userId, recipeId, comment], callback);
    }
};

module.exports = User;

