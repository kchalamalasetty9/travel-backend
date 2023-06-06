module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define("activity", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    start_time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    end_time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    activity_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Activity;
};
