const db = require("../models");
const Itinerary = db.itinerary;
const Day = db.day;
const Activity = db.activity;
const Destination = db.destination;
const DayDestination = db.day_destination;
const { v4: uuidv4 } = require("uuid");

exports.createItinerary = async (req, res) => {
  try {
    // Create the itinerary
    const { userId, name, startDate, endDate } = req.body;
    if (name === undefined) {
      const error = new Error("Itenary Name cannot be empty for itinerary!");
      error.statusCode = 400;
      throw error;
    } else if (startDate === undefined) {
      const error = new Error("StartDate cannot be empty for itinerary!");
      error.statusCode = 400;
      throw error;
    } else if (endDate === undefined) {
      const error = new Error("EndDate cannot be empty for itinerary!");
      error.statusCode = 400;
      throw error;
    }
    const itinerary = await Itinerary.create({
      id: uuidv4(),
      userId,
      name,
      startDate,
      endDate,
    });

    const { days } = req.body;
    if (days && Array.isArray(days)) {
      for (const dayData of days) {
        // Create the day
        const day = await Day.create({
          id: uuidv4(),
          itineraryId: itinerary.id,
          day_date: dayData.date,
        });

        const { destinations } = dayData;
        if (destinations && Array.isArray(destinations)) {
          for (const destinationData of destinations) {
            // Create the destination
            const destination = await Destination.create({
              id: uuidv4(),
              destination_name: destinationData.location,
              hotelId: destinationData.hotel.id,
            });

            // Create the DayDestination entry
            await DayDestination.create({
              dayId: day.id,
              destinationId: destination.id,
            });

            const { activities } = destinationData;
            if (activities && Array.isArray(activities)) {
              for (const activityData of activities) {
                // Create the activity
                await Activity.create({
                  id: uuidv4(),
                  destinationId: destination.id,
                  activity_name: activityData.name,
                  start_time: activityData.startTime + ":00",
                  end_time: activityData.endTime + ":00",
                });
              }
            }
          }
        }
      }
    }

    res.status(201).json(itinerary);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.createItineraryOnly = async (req, res) => {
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
  }
  try {
    const { id, name, startDate, endDate } = req.body;
    const itinerary = await Itinerary.create({
      id,
      name,
      startDate,
      endDate,
    });
    res.json(itinerary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getItinerary = async (req, res) => {
  try {
    const itineraries = await Itinerary.findAll({
      where: { userId: req.params.userId },
      include: [
        // { model: Day, include: [{ model: Destination, include: [Activity] }] },
      ],
    });
    res.json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.findItineraryById = async (req, res) => {
  try {
    const { itineraryId } = req.params;
    const itinerary = await Itinerary.findOne({
      where: { id: itineraryId },
      include: [
        { model: Day, include: [{ model: Destination, include: [Activity] }] },
      ],
    });
    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
    }
    res.json(itinerary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateItinerary = async (req, res) => {
  try {
    // Create or update the itinerary
    const { userId, name, startDate, endDate } = req.body;
    if (name === undefined) {
      const error = new Error("Itinerary Name cannot be empty!");
      error.statusCode = 400;
      throw error;
    } else if (startDate === undefined) {
      const error = new Error("Start Date cannot be empty!");
      error.statusCode = 400;
      throw error;
    } else if (endDate === undefined) {
      const error = new Error("End Date cannot be empty!");
      error.statusCode = 400;
      throw error;
    }

    let itinerary;
    if (req.body.id) {
      // Update existing itinerary
      itinerary = await Itinerary.findOne({ where: { id: req.body.id } });
      if (!itinerary) {
        const error = new Error("Itinerary not found!");
        error.statusCode = 404;
        throw error;
      }

      await itinerary.update({
        userId,
        name,
        startDate,
        endDate,
      });
    } else {
      // Create new itinerary
      itinerary = await Itinerary.create({
        id: uuidv4(),
        userId,
        name,
        startDate,
        endDate,
      });
    }

    const { days } = req.body;
    if (days && Array.isArray(days)) {
      for (const dayData of days) {
        // Create or update the day
        let day;
        if (dayData.id) {
          day = await Day.findOne({ where: { id: dayData.id } });
          if (!day) {
            const error = new Error("Day not found!");
            error.statusCode = 404;
            throw error;
          }

          await day.update({
            itineraryId: itinerary.id,
            day_date: dayData.date,
          });
        } else {
          day = await Day.create({
            id: uuidv4(),
            itineraryId: itinerary.id,
            day_date: dayData.date,
          });
        }

        const { destinations } = dayData;
        if (destinations && Array.isArray(destinations)) {
          for (const destinationData of destinations) {
            // Create or update the destination
            let destination;
            if (destinationData.id) {
              destination = await Destination.findOne({
                where: { id: destinationData.id },
              });
              if (!destination) {
                const error = new Error("Destination not found!");
                error.statusCode = 404;
                throw error;
              }

              await destination.update({
                destination_name: destinationData.location,
                hotelId: destinationData.hotel.id,
              });
            } else {
              destination = await Destination.create({
                id: uuidv4(),
                dayId: day.id,
                destination_name: destinationData.location,
                hotelId: destinationData.hotel.id,
              });
              // Create the DayDestination entry
              await DayDestination.create({
                dayId: day.id,
                destinationId: destination.id,
              });
            }

            const { activities } = destinationData;
            if (activities && Array.isArray(activities)) {
              for (const activityData of activities) {
                // Create or update the activity
                let activity;
                if (activityData.id) {
                  activity = await Activity.findOne({
                    where: { id: activityData.id },
                  });
                  if (!activity) {
                    const error = new Error("Activity not found!");
                    error.statusCode = 404;
                    throw error;
                  }

                  await activity.update({
                    destinationId: destination.id,
                    activity_name: activityData.name,
                    start_time: activityData.startTime,
                    end_time: activityData.endTime,
                  });
                } else {
                  await Activity.create({
                    id: uuidv4(),
                    destinationId: destination.id,
                    activity_name: activityData.name,
                    start_time: activityData.startTime + ":00",
                    end_time: activityData.endTime + ":00",
                  });
                }
              }
            }
          }
        }
      }
    }

    res.status(201).json(itinerary);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findByPk(req.params.itineraryId);
    if (itinerary) {
      await itinerary.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Itinerary not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete itinerary" });
  }
};
