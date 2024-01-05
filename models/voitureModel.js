const sequelize = require('../database/database');
const { DataTypes } = require('sequelize');

const Moteur = require('./moteurModel');
const Option = require('./optionModel')

const Voiture = sequelize.define('Voiture', {
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

Voiture.belongsTo(Moteur);
// Voiture.belongsToMany(Option, { through: 'VoitureOptions' });

module.exports = Voiture;