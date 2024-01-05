const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const Moteur = sequelize.define('Moteur', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chevaux: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    taille: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Moteur;