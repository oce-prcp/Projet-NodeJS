const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const Voiture = require('./voitureModel')

const Utilisateur = sequelize.define('Utilisateur', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    freezeTableName: true
  });

  
Utilisateur.hasMany(Voiture);


module.exports = Utilisateur;