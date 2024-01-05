const sequelize = require('../database/database')
const { DataTypes, Op } = require('sequelize')

const Option = sequelize.define('Option', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prix: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    sequelize,
    freezeTableName: true
  });

module.exports = Option;