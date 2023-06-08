module.exports = (sequelize, Sequelize) => {
  const Destination = sequelize.define("destination", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      destination_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
  });

  return Destination;
};
