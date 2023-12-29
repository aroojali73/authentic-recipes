const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Import controller functions
const { login } = require('../controllers/userController');
// Note: 'register' is not being used here as we're replacing it with a test route

//GET login page
router.get('/login', userController.getLoginPage);
router.get('/register', userController.getRegisterPage);

//Profile page route
router.get('/profile', userController.getProfilePage);

// Test Route for Registration
router.post('/register', userController.register);

// Original login route
router.post('/login', userController.login);
router.post('/profile', userController.updateProfile);

module.exports = router;

