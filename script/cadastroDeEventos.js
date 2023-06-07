/***************************************************

                 ISAAC ESTEVE AQUI °-°
                    
****************************************************/

/* IMPLEMENTAÇÃO DO MÉTODO POST */


// EVENT LISTENNER
let retorno;





//FUNCTION THAT GETS THE VALUES SUBMITER BY THE ADMIN
function getElements(){
    
    console.log("comecei a executar a função");
    let nome = document.getElementById("nome").value;
    let atracoes = document.getElementById("atracoes").value;
    let descricao = document.getElementById("descricao").value;
    let data = document.getElementById("data").value;
    let lotacao = document.getElementById("lotacao").value;
    console.log("peguei os valores");
    retorno =
    {
        "name": nome,
        "poster": '',
        "attractions": [atracoes],
        "description": descricao,
        "scheduled": data,
        "number_tickets": lotacao
    };
    console.log(retorno);
}

console.log("*********  OI ***********");

document.getElementById("postEvent").addEventListener("submit", (event)=>{
    console.log("OK, PEGUEI O EVENTO");
    event.preventDefault();
    getElements();
});


