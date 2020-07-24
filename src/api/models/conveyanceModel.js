const Sequelize =require('sequelize')
const db = require('../../config/connections');
 
module.exports = function(sequelize, DataTypes){
	var conveyance = sequelize.define('conveyance', {
		id: {
		type: DataTypes.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull: false,
		// field: 'user_id',
	},	

	invoice : DataTypes.INTEGER,

	pay : DataTypes.INTEGER,
	
	purpose : DataTypes.INTEGER,
	
	mode : DataTypes.INTEGER,
	
	kms : DataTypes.STRING,
	
	amount : DataTypes.STRING,
	
	attachment : DataTypes.STRING,
	
	from : {
		 type: DataTypes.TIME,
	},
	to : {
		 type: DataTypes.TIME,
	},
	// created_at: {
	// 	 type: DataTypes.DATE,
	// },
	//  updated_at: {
	// 	type: DataTypes.DATE,
 //    	// defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
		 
	// }
	},{
	  // don't add the timestamp attributes (updatedAt, createdAt)
		timestamps: true,
		underscored: true,
		freezeTableName: true,
  		tableName: 'conveyance'

	  // your other configuration here

	})
	return conveyance;
};