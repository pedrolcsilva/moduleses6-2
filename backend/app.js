const express = require('express');
const birthdays = require('./modules/aniversariantes.js');
const sector = require('./modules/setor.js');
const alphabetical = require('./modules/ordenar.js');
const cors = require('cors')
const fs = require('fs');

const funcionarios = JSON.parse(fs.readFileSync('./database.json'))

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()) //habilitando cors na nossa aplicacao

app.get('/', (req, res) => res.send("Hello World"))

app.get('/teste/:search/:esc', function(req, res) {
    let funcSearch = []

    if(req.params.esc == "data" && req.params.search != 'a'){
        funcSearch = birthdays(req.params.search);
    }
    if(req.params.esc == "setor" && req.params.search != 'a'){
        funcSearch = sector(req.params.search);
    }

    console.log(funcSearch)
    if(funcSearch.length == 0 ){
       res.send("Não existem funcionários com essas especificações")
    }else{
      res.send( funcSearch );
     }

});

app.get('/alpha', alphabetical)

app.post('/register', (req, res) => {
    //console.log(funcionarios)
    const {addMat, addNome, addEmail, addRamal, addSetor, addData} = req.body;
    funcionarios.push({matricula: addMat, nome: addNome, email: addEmail, ramal: addRamal, setor: addSetor, dataN: new Date(addData)})
    
    fs.writeFileSync('./database.json', "");
    fs.writeFileSync('./database.json', JSON.stringify(funcionarios));
    res.sendStatus(201)
})  


const server = app.listen(3000, () => { 
    console.log("http://localhost:3000");
});