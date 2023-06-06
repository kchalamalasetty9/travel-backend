module.exports = (app) => {
    const Itinerary = require("../controllers/itinerary.controller.js");
    const { authenticateRoute } = require("../authentication/authentication");
    var router = require("express").Router();

    router.get('/users/:userId/itineraries', Itinerary.getItinerary)
    router.post('/itineraries', Itinerary.createItinerary)
    router.get('/itineraries/:itineraryId', Itinerary.findItineraryById)
    router.put('/itineraries/:itineraryId', Itinerary.updateItinerary)
    router.delete('/itineraries/:itineraryId', Itinerary.deleteItinerary)

  
    app.use("/travelapi", router);
  };