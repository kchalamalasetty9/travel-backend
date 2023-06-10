module.exports = (app) => {
    const Hotel = require("../controllers/hotel.controller.js");
    var router = require("express").Router();
  
    router.post("/hotels", Hotel.createHotel);
    router.get("/hotels", Hotel.getHotels);
    router.get("/hotels/:hotelId", Hotel.getHotelById);
    router.put("/hotels/:hotelId", Hotel.updateHotel);
    router.delete("/hotels/:hotelId", Hotel.deleteHotel);
  
    app.use("/travelapi", router);
  };