const express = require("express");
const app = express() ;
const bodyParser = require("body-parser");
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');



//database connection
connection.authenticate()
.then(()=>{
console.log('conectado com sucesso no banco!');
})
.catch((msgErro)=>{
    console.log('algum erro ocorreu')
})


//estou dizendo para o express usar o ejs como view engine , reenderizador de html
app.set('view engine','ejs');
app.use(express.static('public'));
//bodyparser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//servidor
app.listen(8008,()=>{
    console.log("server conectado!");
});

//rotas
app.get('/',(req,res) =>{
    Pergunta.findAll({raw: true, order:[['id','DESC']]}).then(pergunta =>{
        res.render('index',{
            pergunta : pergunta
        });
    });

});

app.get('/perguntar',(req,res) =>{
    res.render('perguntar');
    });
   
    
app.post('/receberpergunta',(req,res) =>{
    var titulo = req.body.titulo;
    var pergunta = req.body.pergunta;
    Pergunta.create({
        titulo: titulo ,
        descricao : pergunta
    }).then(()=>{
        console.log('gravado com sucesso!');
        res.redirect("/");
    });
});

app.get('/pergunta/:id',(req,res)=>{
var id = req.params.id;

Pergunta.findOne({where : {id,id}}).then(pergunta =>{
   
    if(pergunta != undefined){
 Resposta.findAll({
     where:{perguntaId : pergunta.id }
    }).then((respostas)=>{
        res.render("pergunta",{
            pergunta : pergunta,
            respostas : respostas
        });
    });       
    }else{
        res.redirect("/");
        console.log("erro");
    }
})
})

app.post("/responder",(req,res)=>{
var corpo = req.body.corpo;
var perguntaId = req.body.idpergunta ;
Resposta.create({
    corpo : corpo ,
    perguntaId : perguntaId
}).then(()=>{
    console.log('gravado com sucesso!');
    res.redirect("/pergunta/"+perguntaId);
});



});