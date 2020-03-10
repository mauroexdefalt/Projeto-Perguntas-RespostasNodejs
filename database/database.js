const Sequelize = require('sequelize');
const connection = new Sequelize('bancopergunta','root','evolution',{
    host:'localhost',
    dialect:'mysql'
});

module.exports = connection ;