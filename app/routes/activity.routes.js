module.exports = (app) => {
  const Activity = require("../controllers/activity.controller.js");
  var router = require("express").Router();

  router.post("/destinations/:destinationId/activities", Activity.createActivity);
  router.get("/activities/:activityId", Activity.getActivity);
  router.put("/activities/:activityId", Activity.updateActivity);
  router.delete("/activities/:activityId", Activity.deleteActivity);

  app.use("/travelapi", router);
};
