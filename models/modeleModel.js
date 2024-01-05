const sequelize = require('../database/database');
const { Sequelize, DataTypes } = require('sequelize');

const Modele = sequelize.define('Modele', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    portes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    moteur: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAcheter: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    prixTotal: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0 // Prix total par défaut pour chaque voiture
    }
});

module.exports = Modele;