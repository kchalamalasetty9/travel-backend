module.exports = (app) => {
  const Activity = require("../controllers/activity.controller.js");
  var router = require("express").Router();

  app.post("/destinations/:destinationId/activities", Activity.createActivity);
  app.get("/activities/:activityId", Activity.getActivity);
  app.put("/activities/:activityId", Activity.updateActivity);
  app.delete("/activities/:activityId", Activity.deleteActivity);

  app.use("/travelapi", router);
};
