const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 2000;

const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
const restaurantRoutes = require('./routes/restaurants');

app.use(session({
    secret: 'authentic_recipes', // Change this to a random secret string
    resave: false,
    saveUninitialized: true
}));

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware for parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static('public'));

// Routes
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/restaurants', restaurantRoutes);
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


