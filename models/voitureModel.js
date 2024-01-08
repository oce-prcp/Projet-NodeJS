const sequelize = require('../database/database');
const { DataTypes } = require('sequelize');

const Moteur = require('./moteurModel');
const Option = require('./optionModel')
const Utilisateur = require('./userModel')

const Voiture = sequelize.define('Voiture', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    portes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isAcheter: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    prix: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
        allowNull: false
    },
    prixTotal: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
        allowNull: false
    },

}, {
    sequelize,
    freezeTableName: true
  });

Voiture.belongsTo(Moteur);
Voiture.belongsTo(Utilisateur);
Voiture.belongsToMany(Option, { through: 'voiture_option' });

module.exports = Voiture;