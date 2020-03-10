const Sequelize = require('sequelize');
const Connection = require('./database');


const Pergunta = Connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull:false
    }
});

Pergunta.sync({force: false}).then(()=>{
    console.log('tabela pegunta criada com sucesso!')
});

module.exports = Pergunta;