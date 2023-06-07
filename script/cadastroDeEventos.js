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
    console.log({
        "name": nome,
        "poster": '',
        "attractions": [atracoes],
        "description": descricao,
        "scheduled": data,
        "number_tickets": lotacao
    });
    //debug only

    alert("Tem certeza que deseja enviar evento para o Banco de Dados?");//debug only
    axios({//POST is blocked in the browser due to CORS policy °~°
        method: "post",
        url: `${baseURL}/events`,
        data:{
            "name": nome,
            "poster": '',
            "attractions": [atracoes],
            "description": descricao,
            "scheduled": data,
            "number_tickets": lotacao
        }
    })
    .then(response => console.log(response))//logs to the console. Can be a success message
    .catch(error => console.log(error));   
}

//Event handler
document.getElementById("postEvent").addEventListener("submit", (event)=>{
    event.preventDefault();
    getElements();
});

//THIS ONE IS MOSTLY DONE.


