module.exports = (app) => {
    const Itinerary = require("../controllers/itinerary.controller.js");
    const Destination = require("../controllers/destination.controller.js");
    const { authenticateRoute } = require("../authentication/authentication");
    var router = require("express").Router();
    
    router.get('/itineraries/users/:emailId', Itinerary.findAll);
    router.post('/itineraries', Itinerary.create);
    router.get('/itineraries/:itineraryId', Itinerary.findOne);
    router.put('/itineraries/:itineraryId', Itinerary.update);
    router.delete('/itineraries/:itineraryId', Itinerary.delete);


    app.post('/itineraries/:itineraryId/destinations', Destination.create);
    app.get('/itineraries/:itineraryId/destinations/:destinationId', Destination.getDetails);
    app.put('/itineraries/:itineraryId/destinations/:destinationId', Destination.update);
    app.delete('/itineraries/:itineraryId/destinations/:destinationId', Destination.delete);

  
    app.use("/travelapi", router);
  };