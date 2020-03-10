const Sequelize = require('sequelize');
const Connection = require('./database');


const Resposta = Connection.define('resposta',{
    corpo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    perguntaId :{
        type: Sequelize.INTEGER,
        allowNull: false
    }
 
});

Resposta.sync({force: false}).then(()=>{
    console.log('tabela pegunta criada com sucesso!')
});

module.exports = Resposta;