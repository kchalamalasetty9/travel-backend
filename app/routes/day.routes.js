module.exports = (app) => {
  const Day = require("../controllers/day.controller.js");
  var router = require("express").Router();

  router.post("/itineraries/:itineraryId/days", Day.createDay);
  router.get("/days/:dayId", Day.getDay);
  router.put("/days/:dayId", Day.updateDay);
  router.delete("/days/:dayId", Day.deleteDay);

  app.use("/travelapi", router);
};
