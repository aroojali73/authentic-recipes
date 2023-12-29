const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.post('/', restaurantController.addRestaurant);
router.get('/', restaurantController.getAllRestaurants);
router.get('/list', restaurantController.listAllRestaurants);
router.get('/search', restaurantController.handleSearch);
router.get('/add', (req, res) => {
    res.render('add-restaurant');
});


module.exports = router;
