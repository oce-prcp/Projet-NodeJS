const Sequelize = require('sequelize');

const sequelize = new Sequelize('testSequelize', 'root', '', {
    host : 'localhost',
    dialect : 'mariadb'
});

sequelize.authenticate().them(()=>{
    console.log('authentication success');
}).catch(err=>{
    console.log(err);
});

module.exports = sequelize