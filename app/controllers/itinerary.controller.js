const db = require("../models");
const Itinerary = db.itinerary;


exports.create = async (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Itenary Name cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.startDate === undefined) {
    const error = new Error("StartDate cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.endDate === undefined) {
    const error = new Error("EndDate cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.email === undefined) {
    const error = new Error("Email cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  }
  try {
    const { name, startDate, endDate, email } = req.body;
    const itinerary = await Itinerary.create({
      name,
      startDate,
      endDate,
      email
    });
    res.json(itinerary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.findAll = async (req, res) => {
  try {
    const itineraries = await Itinerary.findAll({
      where: { email: req.params.emailId },
    });
    res.json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.findOne = async (req, res) => {
  try {
    const { itineraryId } = req.params;
    const itinerary = await Itinerary.findOne({
      where: { id: itineraryId},
    });
    if (!itinerary) {
      return res.status(404).json({ error: 'Itinerary not found' });
    }
    res.json(itinerary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.update = async (req, res) => {
    try {
        const { itineraryId } = req.params;
        const { name, startDate, endDate, email } = req.body;
        
        const updatedItinerary = await Itinerary.update(
          { name, startDate, endDate },
          {
            where: { id: itineraryId, email }, 
            returning: true,
          }
        );
        if (updatedItinerary[0] === 0) {
          return res.status(404).json({ error: 'Itinerary not found' });
        }
        res.json(updatedItinerary[1][0]); 
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
};

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
    try {
        const { itineraryId } = req.params;
        const { name, startDate, endDate, email } = req.body;
        
        const updatedItinerary = await Itinerary.update(
          { name, startDate, endDate },
          {
            where: { id: itineraryId, email }, 
            returning: true,
          }
        );
        if (updatedItinerary[0] === 0) {
          return res.status(404).json({ error: 'Itinerary not found' });
        }
        res.json(updatedItinerary[1][0]); 
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
};
