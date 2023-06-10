const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.itinerary = require('./itinerary.model.js')(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.destination = require("./destination.model.js")(sequelize, Sequelize);
db.day = require("./day.model.js")(sequelize, Sequelize);
// Bridge table
db.day_destination = require("./daydestination.model.js")(sequelize, Sequelize);
db.hotel = require("./hotel.model.js")(sequelize, Sequelize);
db.activity = require("./activity.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.user.hasMany(db.itinerary, { onDelete: 'cascade' });
db.itinerary.belongsTo(db.user);

db.itinerary.hasMany(db.day, { onDelete: 'cascade' });
db.day.belongsTo(db.itinerary);

// Bridge table mapping
db.day.belongsToMany(db.destination, { through: db.day_destination });
db.destination.belongsToMany(db.day, { through: db.day_destination });

db.destination.belongsTo(db.hotel, { as: "hotel" });

db.destination.hasMany(db.activity, { onDelete: 'cascade' });
db.activity.belongsTo(db.destination);




module.exports = db;
