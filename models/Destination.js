const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Trip = require('./Trip');

const Destination = sequelize.define('Destination', {
    destination_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    destination_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE
    },
    end_date: {
        type: DataTypes.DATE
    },
    image_url: {
        type: DataTypes.STRING
    }
});

Trip.hasMany(Destination, { foreignKey: 'trip_id' });
Destination.belongsTo(Trip, { foreignKey: 'trip_id', onDelete: 'CASCADE' });
module.exports = Destination;
