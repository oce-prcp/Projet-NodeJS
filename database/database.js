const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DBDATABASE, process.env.DBUSER, process.env.DBPASSWORD, {
    host : process.env.DBHOST,
    dialect : 'mariadb'
});

sequelize.authenticate().them(()=>{
    console.log('authentication success');
}).catch(err=>{
    console.log(err);
});

module.exports = sequelize