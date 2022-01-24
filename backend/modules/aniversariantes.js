const fs = require('fs');

const funcionarios = JSON.parse(fs.readFileSync('./database.json'))

function birthdays(month){
    let func = []
    funcionarios.forEach(element => {
        let date = new Date(element.dataN)
        if(date.getMonth() + 1 == month){
            func.push(element)
        }
    });
    return func
}

module.exports = birthdays;