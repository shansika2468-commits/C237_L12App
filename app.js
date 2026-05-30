// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

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
        id: Date.now(),
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

//show edit page
app.get("/restaurants/:id/edit", (req, res) => {
    const restaurant = restaurants.find(r => r.id == req.params.id);
    res.render("edit", { restaurant });

    }
);
// Update review page
app.post("/restaurants/:id/update", (req, res) => {

  const restaurant = restaurants.find(r =>
    r.id == req.params.id
  );

  restaurant.name = req.body.name;
  restaurant.cuisine = req.body.cuisine;
  restaurant.rating = req.body.rating;
  restaurant.bestFood = req.body.bestFood;
  restaurant.review = req.body.review;

  res.redirect("/restaurants");

});

// Delete review
app.post("/restaurants/:id/delete", (req, res) => {
    restaurants = restaurants.filter(r =>
        r.id != req.params.id
    );
    res.redirect("/restaurants");
});

// ---------------------------------------------------

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});