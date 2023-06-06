const db = require("../models");
const Itinerary = db.itinerary;
const Day = db.day;

exports.createDay = async (req, res) => {
  try {
    const itinerary = await Itinerary.findByPk(req.params.itineraryId);
    if (!itinerary) {
      return res.status(404).json({ error: 'Itinerary not found' });
    }
    const newDay = await Day.create({ itineraryId: req.params.itineraryId, ...req.body });
    res.status(201).json(newDay);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create day' });
  }
};

exports.getDay =  async (req, res) => {
  try {
    const day = await Day.findByPk(req.params.dayId, {
      include: [{ model: Destination, include: [Activity] }],
    });
    if (day) {
      res.json(day);
    } else {
      res.status(404).json({ error: 'Day not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve day' });
  }
};

exports.updateDay =  async (req, res) => {
  try {
    const day = await Day.findByPk(req.params.dayId);
    if (day) {
      await day.update(req.body);
      res.json(day);
    } else {
      res.status(404).json({ error: 'Day not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update day' });
  }
};

exports.deleteDay =  async (req, res) => {
  try {
    const day = await Day.findByPk(req.params.dayId);
    if (day) {
      await day.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Day not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete day' });
  }
};