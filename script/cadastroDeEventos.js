/***************************************************

                 ISAAC ESTEVE AQUI °-°
                    
****************************************************/

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
        url: `${baseURL}//posts`,
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


