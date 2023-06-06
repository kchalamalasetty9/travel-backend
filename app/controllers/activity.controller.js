const db = require("../models");
const Destination = db.destination;
const Activity = db.activity;

exports.createActivity = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.destinationId);
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    const newActivity = await Activity.create({ destinationId: req.params.destinationId, ...req.body });
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
};

exports.getActivity = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.activityId);
    if (activity) {
      res.json(activity);
    } else {
      res.status(404).json({ error: 'Activity not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve activity' });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.activityId);
    if (activity) {
      await activity.update(req.body);
      res.json(activity);
    } else {
      res.status(404).json({ error: 'Activity not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity' });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.activityId);
    if (activity) {
      await activity.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Activity not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
};