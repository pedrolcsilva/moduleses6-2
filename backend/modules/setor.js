const fs = require('fs');

const funcionarios = JSON.parse(fs.readFileSync('./database.json'))

function sector(setor){
    let func = []
    funcionarios.forEach(element => {
        if(element.setor == setor){
            func.push(element)
        }
    });
    return func
}

module.exports = sector;