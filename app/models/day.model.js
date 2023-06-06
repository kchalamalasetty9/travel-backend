module.exports = (sequelize, Sequelize) => {
  const Day = sequelize.define("day", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    day_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
  });

  return Day;
};
