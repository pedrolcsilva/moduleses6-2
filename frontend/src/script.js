let search;
let esc;
let timeoutID = 0;
const apiURL = "http://localhost:3000/"


document.getElementsByName('search')[0].addEventListener('input', function() {

  search = document.getElementsByName('search')[0].value

  esc = document.getElementById('esc').value

  clearTimeout(timeoutID)
  timeoutID = setTimeout(loadDoc, 2000);
    
})

function loadDoc(){
  document.getElementById("result").innerHTML = "";

  fetch(apiURL + 'teste/' + search + '/' + esc, { method: 'GET' })
    .then(response => {
      // valida se a requisição falhou
      if (!response.ok) {
        return new Error('falhou a requisição') // cairá no catch da promise
      }

      // verificando pelo status
      if (response.status === 404) {
        return new Error('não encontrou qualquer resultado')
      }

      // retorna uma promise com os dados em JSON
      return response.json()
    })

    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
      console.log(data)
      data.forEach(item => {
        let datas = new Date(item.dataN)
        let day = datas.getDate() + 1;
        let month = datas.getMonth() + 1;
        let year = datas.getFullYear();
        if(day < 10){
          day = String("0" + day)
        }
        if(month < 10){
          month = String("0" + month)
        }
        document.getElementById("result").innerHTML += `<tr> <td> ${item.matricula} </td> <td> ${item.nome} </td> <td> ${item.email} </td> <td> ${item.ramal} </td> <td> ${item.setor} </td> <td> ${day + "/" + month + "/" + year} </td> </tr>`;
      });
    })

    .catch(function(error) {
      console.log('Request failed', error);
      document.getElementById("result").innerHTML = "Cliente não encontrado!";
    });

}

document.getElementById('alpha').addEventListener('click', function(){
  document.getElementById("result").innerHTML = "";
  fetch(apiURL + 'alpha',  { method: 'GET' })
    .then(response => {
      if (!response.ok) {
        return new Error('falhou a requisição')
      }

      if (response.status === 404) {
        return new Error('não encontrou qualquer resultado')
      }

      return response.json()
    })
    .then(function(data){
      console.log('Request succeeded with JSON response', data);
      console.log(data)
      data.forEach(item => {
        document.getElementById("result").innerHTML += `<tr> <td> </td> <td> ${item.nome} </td> <td> </td> <td> ${item.ramal} </td> <td>  </td> <td> </td> </tr>`;
      });
    })
})



function registerUser(){
  
  const addMat = document.getElementsByName('addMat')[0].value;
  const addNome = document.getElementsByName('addNome')[0].value;
  const addEmail = document.getElementsByName('addEmail')[0].value;
  const addRamal = document.getElementsByName('addRamal')[0].value;
  const addSetor = document.getElementsByName('addSetor')[0].value;
  const addData = document.getElementsByName('addData')[0].value;

  
  const options = {
    method: 'POST',
    body: JSON.stringify({ addMat, addNome, addEmail, addRamal, addSetor, addData }),
    headers: { 'Content-Type': 'application/json' }
  }
  console.log(options)

  fetch(apiURL + 'register', options)
    .then( response =>  response.text())
    .then( data => {
      console.log(data)
    })
    .catch( err => console.log(err))


}

document.getElementById('add').addEventListener('click', registerUser)