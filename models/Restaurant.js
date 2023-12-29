const db = require('../config/database');

const Restaurant = {
    create: (restaurantData, callback) => {
        const query = "INSERT INTO restaurants (name, cuisine_type, address, latitude, longitude, user_id) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(query, [restaurantData.name, restaurantData.cuisine_type, restaurantData.address, restaurantData.latitude, restaurantData.longitude, restaurantData.user_id], callback);
    },

    findAll: (callback) => {
        const query = "SELECT * FROM restaurants";
        db.query(query, callback);
    },

    findByLocation: (latitude, longitude, radius, callback) => {
        const query = "SELECT * FROM restaurants WHERE ST_Distance_Sphere(point(longitude, latitude), point(?, ?)) <= ?";
        db.query(query, [longitude, latitude, radius], callback);
    }
};

module.exports = Restaurant;
