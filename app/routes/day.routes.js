module.exports = (app) => {
  const Day = require("../controllers/day.controller.js");
  var router = require("express").Router();

  app.post("/itineraries/:itineraryId/days", Day.createDay);
  app.get("/days/:dayId", Day.getDay);
  app.put("/days/:dayId", Day.updateDay);
  app.delete("/days/:dayId", Day.deleteDay);

  app.use("/travelapi", router);
};
