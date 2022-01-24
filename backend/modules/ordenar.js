const fs = require('fs');

const funcionarios = JSON.parse(fs.readFileSync('./database.json'))

function alphabetical(req, res){
    let func = funcionarios.sort(function(a,b){
        if(a.nome < b.nome) {
            return -1;
        }else{
            return true;
        }
    });
    res.send(func)
}

module.exports = alphabetical;