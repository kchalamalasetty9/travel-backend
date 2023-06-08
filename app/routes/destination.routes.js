module.exports = (app) => {
  const Destination = require("../controllers/destination.controller.js");
  var router = require("express").Router();

  app.post("/days/:dayId/destinations", Destination.createDestination);
  app.get("/destinations/:destinationId", Destination.getDestination);
  app.put("/destinations/:destinationId", Destination.updateDestination);
  app.delete("/destinations/:destinationId", Destination.deleteDestination);

  app.use("/travelapi", router);
};
