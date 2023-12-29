const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path accordingly
const Recipe = require('../models/Recipe');

// Registration logic
exports.register = (req, res) => {
    const { username, email, password } = req.body;

    // First, check if the user already exists
    User.findByUsername(username, (err, users) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Error checking user');
        }

        if (users.length > 0) {
            // User already exists
            return res.status(400).send('Username already exists. Please login or use a different username.');
        }

        // Hash password
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('Error hashing password: ', err);
                return res.status(500).send('Error encrypting password');
            }

            // Save user to database
            User.create({ username, email, password: hash }, (err, result) => {
                if (err) {
                    console.error('Error registering user: ', err);
                    return res.status(500).send('Error registering user: ' + err.message);
                }

                // Redirect to a custom success page
                res.redirect('/users/login');
            });
        });
    });
};

// Login logic
exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send('User not found');
        }

        const user = results[0];

        // Compare hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).send('Password incorrect');
            }

            // User is authenticated, proceed to set user session or token
            req.session.userId = user.id;
            req.session.username = user.username;
            res.redirect('/users/profile');
        });
    });
};

// Profile page logic
exports.getProfilePage = (req, res) => {
    const userId = req.session.userId;
    if (!req.session.userId) {
        return res.redirect('/users/login'); // Redirect to login if not authenticated
    }

    // Fetch user-specific recipes
    Recipe.findByUserId(req.session.userId, (err, userRecipes) => {
        if (err) {
            // Handle error, e.g., render an error page or log the error
            console.error('Error fetching recipes:', err);
            return res.status(500).send('Error fetching recipes');
        }

        // Render the profile page with user and recipes data
        res.render('profile', { 
            user: { username: req.session.username },
            userRecipes: userRecipes 
        });
    });
};

// Logout logic
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out, please try again');
        }
        res.redirect('/users/login');
    });
};

// Render login page
exports.getLoginPage = (req, res) => {
    res.render('login');
};

// Render registration page
exports.getRegisterPage = (req, res) => {
    res.render('register');
};

exports.updateProfile = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.redirect('/users/login');
    }

    const { username, email, password} = req.body;

    User.update(userId, { username, email, password}, (err, result) => {
        if (err) {
            console.error('Error updating profile:', err);
            return res.status(500).send('Error updating profile');
        }

        res.redirect('/users/profile');
    });
};
