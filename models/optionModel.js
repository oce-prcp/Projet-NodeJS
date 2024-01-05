const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

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

Option.belongsToMany(Voiture, { through: 'VoitureOptions' });


module.exports = Option;