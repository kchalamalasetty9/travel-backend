const db = require("../models");
const Hotel = db.hotel;
exports.createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create({ ...req.body });
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ error });
  }
};;

exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getHotelById = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const hotel = await Hotel.findByPk(hotelId);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error });
  }
};


exports.updateHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { hotel_name } = req.body;
    const hotel = await Hotel.findByPk(hotelId);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    hotel.hotel_name = hotel_name;
    await hotel.save();
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error });
  }
};


exports.deleteHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const hotel = await Hotel.findByPk(hotelId);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    await hotel.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error });
  }
};
