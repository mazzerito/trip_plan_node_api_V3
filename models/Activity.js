const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Destination = require('./Destination');

const Activity = sequelize.define('Activity', {
    activity_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    activity_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    location: {
        type: DataTypes.STRING
    },
    start_time: {
        type: DataTypes.TIME
    },
    end_time: {
        type: DataTypes.TIME
    },
    activity_cost: {
        type: DataTypes.FLOAT
    }
});

Destination.hasMany(Activity, { foreignKey: 'destination_id' });
Activity.belongsTo(Destination, { foreignKey: 'destination_id', onDelete: 'CASCADE' });

module.exports = Activity;
