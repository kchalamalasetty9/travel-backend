module.exports = (sequelize, Sequelize) => {
    const Hotel = sequelize.define("hotel", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      hotel_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  
    return Hotel;
  };
  