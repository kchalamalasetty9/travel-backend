module.exports = (app) => {
    const Itinerary = require("../controllers/ite.controller.js");
    const { authenticateRoute } = require("../authentication/authentication");
    var router = require("express").Router();
  
    // Create a new User
    router.post("/users/", User.create);

    // Retrieve all Users
    router.get("/users/", User.findAll);

    // Retrieve a single User with id
    router.get("/users/:id", User.findOne);
  
    // Update a User with id
    router.put("/users/:id", [authenticateRoute], User.update);
  
    // Delete a User with id
    router.delete("/users/:id", [authenticateRoute], User.delete);
  
    // Delete all User
    router.delete("/users/", [authenticateRoute], User.deleteAll);

    router.get('/itineraries/users/:emailId',  [authenticateRoute], Itinerary.findAll);
    router.post('/itineraries',  [authenticateRoute], Itinerary.create);
    router.get('/itineraries/:itineraryId',  [authenticateRoute], Itinerary.findOne);
    router.put('/itineraries/:itineraryId',  [authenticateRoute], Itinerary.update);
    router.delete('/itineraries/:itineraryId',  [authenticateRoute], Itinerary.delete);
  
    app.use("/travelapi", router);
  };