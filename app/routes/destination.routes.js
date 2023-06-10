module.exports = (app) => {
  const Destination = require("../controllers/destination.controller.js");
  var router = require("express").Router();

  router.post("/days/:dayId/destinations", Destination.createDestination);
  router.get("/destinations/:destinationId", Destination.getDestination);
  router.put("/destinations/:destinationId", Destination.updateDestination);
  router.delete("/destinations/:destinationId", Destination.deleteDestination);

  app.use("/travelapi", router);
};
