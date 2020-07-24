const winston = require('winston')
const Sequelize =require('sequelize')
const db ={}

var sequelize = new Sequelize(CONFIG.mysqldb_name, CONFIG.mysqldb_user, CONFIG.mysqldb_password, {
  host: CONFIG.mysqldb_host,
  dialect: CONFIG.mysqldb_dialect,
  operatorAliases: false,
  freezeTableName: true,
  // underscored: true,
  timezone: '+05:30' //for writing to database
})

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.conveyance = require("../api/models/conveyanceModel")(sequelize,Sequelize);
db.hotel = require("../api/models/hotelModel")(sequelize,Sequelize);


module.exports = db;