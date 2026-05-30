// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Declare any necessary variables or in-memory data structures here

let restaurants = [
    {
        id: 1,
        name: "Guzman y Gomez",
        cuisine: "Mexican",
        rating: 4,
        bestFood: "Salmon Sushi",
        review: "Affordable and fast"
    },
    {
        id: 2,
        name: "Seoul Garden",
        cuisine: "Korean",
        rating: 5,
        bestFood: "Kimchi Fried Rice",
        review: "Very tasty"
    },
    {
        id: 3,
        name: "Sushi Train",
        cuisine: "Japanese",
        rating: 3,
        bestFood: "Salmon Sushi",
        review: "Affordable but not the best quality"
    }
]

// TASK: Define appropriate routes below
// ---------------------------------------------------

//Define a route to render the index page
app.get('/', (req, res) => {
    res.render('index', { restaurants });
});

//view all restaurant reviews
app.get("/restaurants", (req, res) => {

  let filteredRestaurants = restaurants;

  if (req.query.cuisine) {

    filteredRestaurants = restaurants.filter(r =>
      r.cuisine === req.query.cuisine
    );
}
    
  res.render('restaurants', { restaurants: filteredRestaurants });
});

//show add form
app.get("/restaurants/new", (req, res) => {
    res.render('new');
});

//add review
app.post("/restaurants", (req, res) => {
    const newRestaurant = {
        id= restaurants.length + 1,
        name: req.body.name,
        cuisine: req.body.cuisine,
        rating: req.body.rating,
        bestFood: req.body.bestFood,
        review: req.body.review
    };
    restaurants.push(newRestaurant);
    res.render("success", {
    restaurant: newRestaurant

    });
}); 
// ---------------------------------------------------

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});