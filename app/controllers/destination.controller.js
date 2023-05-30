const db = require("../models");
const Destination = db.destination;

exports.create = async (req, res) => {
  const { itineraryId } = req.params;
  const { destinationName, arrivalDate, departureDate } = req.body;

  try {
    const destination = await Destination.create({
      itineraryId,
      destinationName,
      arrivalDate,
      departureDate,
    });

    res.status(201).json({ destination });
  } catch (error) {
    res.status(500).json({ error: "Failed to create destination" });
  }
};

exports.getDetails = async (req, res) => {
  const { itineraryId, destinationId } = req.params;

  try {
    const destination = await Destination.findOne({
      where: { id: destinationId, itineraryId },
    });

    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    res.json({ destination });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch destination details" });
  }
};

exports.update = async (req, res) => {
  const { itineraryId, destinationId } = req.params;
  const { destinationName, arrivalDate, departureDate } = req.body;

  try {
    const destination = await Destination.findOne({
      where: { id: destinationId, itineraryId },
    });

    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    await destination.update({
      destinationName,
      arrivalDate,
      departureDate,
    });

    res.json({ destination });
  } catch (error) {
    res.status(500).json({ error: "Failed to update destination" });
  }
};

exports.delete = async (req, res) => {
  const { itineraryId, destinationId } = req.params;

  try {
    const destination = await Destination.findOne({
      where: { id: destinationId, itineraryId },
    });

    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    await destination.destroy();

    res.json({ message: "Destination deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete destination" });
  }
};
