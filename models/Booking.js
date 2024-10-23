const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Trip = require('./Trip');

const Booking = sequelize.define('Booking', {
    booking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    booking_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    booking_cost: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    booking_date: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.STRING
    }
});

Booking.belongsTo(Trip, {foreignKey: 'trip_id', onDelete: 'CASCADE'});
Trip.hasMany(Booking, {foreignKey: 'trip_id'});

module.exports = Booking;
