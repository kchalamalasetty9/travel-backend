module.exports = (sequelize, Sequelize) => {
  const Destination = sequelize.define("destination", {
      id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
      },
      destination_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
  });

  return Destination;
};
