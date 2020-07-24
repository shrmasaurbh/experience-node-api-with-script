const Sequelize =require('sequelize')
const db = require('../../config/connections');
 
module.exports = function(sequelize, DataTypes){
	var hotel = sequelize.define('hotel', {
		id: {
		type: DataTypes.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull: false,
		// field: 'user_id',
	},	

	invoice : DataTypes.INTEGER,
	
	mode : DataTypes.INTEGER,
	
	pay : DataTypes.INTEGER,

	name : DataTypes.STRING,
	
	amount : DataTypes.STRING,
	
	attachment : DataTypes.STRING,
	
	from_date: {
		 type: DataTypes.DATE,
	},
	to_date: {
		 type: DataTypes.DATE,
	},
	// created_at: {
	// 	 type: DataTypes.DATE,
	// },
	//  updated_at: {
	// 	 type: DataTypes.DATE,
 //        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
		 
	// }
	},{
	  // don't add the timestamp attributes (updatedAt, createdAt)
		timestamps: true,
		underscored: true,
		freezeTableName: true,
  		tableName: 'hotel'

	  // your other configuration here

	})
	return hotel;
};