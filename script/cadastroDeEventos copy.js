/***************************************************

                 ISAAC ESTEVE AQUI °-°
                    
****************************************************/

/*FOR SOME BLACK MAGIC, THIS IS REQUIRED*/
axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';



/* IMPLEMENTAÇÃO DO MÉTODO POST */
const baseURL = "https://soundgarden-api.vercel.app";

//FUNCTION THAT GETS THE VALUES SUBMITER BY THE ADMIN
function getElements(){
    let nome = document.getElementById("nome").value;
    let atracoes = document.getElementById("atracoes").value;
    let descricao = document.getElementById("descricao").value;
    let data = document.getElementById("data").value;
    let lotacao = document.getElementById("lotacao").value;

    //debug only
    console.log("peguei os valores");
    let json = JSON.stringify({
        "name": nome,
        "poster": 'https://i.imgur.com/fQHuZuv.png',
        "attractions": [atracoes],
        "description": descricao,
        "scheduled": data,
        "number_tickets": lotacao
    });
    //debug only
    //https://www.youtube.com/watch?v=UBPg5ftCMv8

    alert("Tem certeza que deseja enviar evento para o Banco de Dados?");//debug only
    axios.post(`${baseURL}/events`,  json
        , {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT, POST, PATCH. DELETE, GET',
            }
        }
    )
    .then(response => console.log(response))//logs to the console. Can be a success message
    .catch(error => console.log("error log: ", error));   
}

//Event handler
document.getElementById("postEvent").addEventListener("click", (event)=>{
    event.preventDefault();
    getElements();
});

//THIS ONE IS MOSTLY DONE.


