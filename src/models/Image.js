const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const image = sequelize.define('image', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // hotelId
});

module.exports = image;