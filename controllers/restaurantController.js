const Restaurant = require('../models/Restaurant');

exports.addRestaurant = async (req, res) => {
    const { name, cuisine_type, address, latitude, longitude, user_id } = req.body;
    console.log("Received restaurant data:", req.body);

    try {
        // Wrap the Restaurant.create call in a Promise
        await new Promise((resolve, reject) => {
            Restaurant.create({ name, cuisine_type, address, latitude, longitude, user_id }, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        // Redirect on successful addition
        res.redirect('/users/profile');
    } catch (err) {
        console.error('Error adding restaurant:', err);
        res.status(500).send('Error adding restaurant: ' + err.message);
    }
};


exports.getAllRestaurants = (req, res) => {
    Restaurant.findAll((err, results) => {
        if (err) {
            return res.status(500).send('Error retrieving restaurants');
        }
        res.json(results);
    });
};

exports.listAllRestaurants = (req, res) => {
    Restaurant.findAll((err, results) => {
        if (err) {
            return res.status(500).send('Error retrieving restaurants');
        }
        res.render('list-restaurants', { restaurants: results });
    });
};

exports.handleSearch = (req, res) => {
    if (Object.keys(req.query).length === 0) {
        // If there are no query parameters, render the search page
        res.render('search-restaurants');
    } else {
        // Otherwise, perform the search
        const { latitude, longitude, radius } = req.query;
        Restaurant.findByLocation(latitude, longitude, radius, (err, results) => {
            if (err) {
                return res.status(500).send('Error finding restaurants');
            }
            // Render a different view to display search results or modify as needed
            res.render('search-results', { results });
        });
    }
};
