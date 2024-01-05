const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root:votre_mot_de_passe@localhost:3306/gestion_automobile');

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
    }
});

module.exports = Modele;