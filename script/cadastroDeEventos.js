const btnSubmit = document.querySelector(".btn-primary")
const descriptionSeletor = document.querySelector("#descricao")

btnSubmit.addEventListener("click", () => cadastroEvento())
function criandoEvento(url , corpo){
    fetch(url, {
        method: "POST",
        headers: { 'Content-type': "application/json", },
        body: JSON.stringify(corpo)
    })
    .then(() => console.log(JSON.stringify(corpo)))
    .then(() => alert("Evendo cad com sucesso"))
    .then(()=> window.location.href = "admin.html" )
    .catch((error)=>alert("Não foi possivel cadastrar, tente novamente"))
}

function cadastroEvento(){
    event.preventDefault();
    const url = "https://soundgarden-api.vercel.app/events";
    const nameSelector = document.querySelector("#nome").value
    const atrctionSelector = document.querySelector("#atracoes").value.split(", ")
    const descriptionSelector = document.querySelector("#descricao").value
    const datetimeSelector = document.querySelector("#data").value
    const lotacaoSelector = document.querySelector("#lotacao").value
    corpo = {
        "name": nameSelector,
        "poster": 'https://i.imgur.com/fQHuZuv.png',
        "attractions": atrctionSelector,
        "description": descriptionSelector,
        "scheduled": datetimeSelector,
        "number_tickets": lotacaoSelector
    }
    criandoEvento(url, corpo);
}

