/***************************************************

                 ISAAC ESTEVE AQUI °-°
                    
****************************************************/

//BLACK MAGIC FUCKERY - DON'T TOUCH. I REPEAT: DO NOT FUCKING TOUCH!!!
axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';


const baseURL = "https://soundgarden-api.vercel.app";


//WHEN THE PAGE IS LOADED, THE INFO APEARS ON SCREEN

let ID = window.location.search.substring(4);//GETS THE ID FROM THE URL °-°

window.onload = function() {
    loadEvents();
  };

//FUNCTION THAT UPDATES GETS THE DATA FROM THE EVENT YOU ARE ABOUT TO DELET FROM THE API
function loadEvents(){
    
    console.log(ID);
    let evento;
    //AXIOS gets the events from the DB
    axios({
        method: "get",
        url: `${baseURL}/events/${ID}`       
    },  {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'PUT, POST, PATCH. DELETE, GET',
        }
    })
    .then(response => {
        evento = response;
        fillForm(evento);
    })
    .catch(error => console.log(error));       
};

//FUNCTION THAT PUTS THE INFO ABOUT WHAT YOU ARE ABOUT TO DELETE
function fillForm(evento){
    document.querySelector('#nome').value = evento.data.name;
    document.querySelector('#banner').value = evento.data.poster;
    document.querySelector('#atracoes').value =  evento.data.attractions.join(', ');
    document.querySelector('#descricao').value = evento.data.description;
    document.querySelector('#data').value = new Date(evento.data.scheduled).toLocaleString("pt-br");
    document.querySelector('#lotacao').value = evento.data.number_tickets;
}

//NOW LETS DEAL WITH UNFOLDING OF EVENTS THAT HAVE TO ACCOUR IN ORDER FOR THE DATA TO BE DELETED.

//FIRST WE HAVE TO HANDLE THE PRESSING OF THE EDIT BUTTON EVENT
const btnSubmit = document.querySelector(".btn-danger");

btnSubmit.addEventListener("click", () => atualizaEvento());


async function atualizaEvento() {
    event.preventDefault()
    
    const nameSelector = document.querySelector('#nome').value;
    const attractionsSelector = document.querySelector('#atracoes').value.split(", ");
    const descriptionSelector = document.querySelector('#descricao').value;
    const dateSelector = document.querySelector('#data').value;
    const capacitySelector = document.querySelector('#lotacao').value;
    corpo =
    {
        name: nameSelector,
        poster: "https://i.imgur.com/fQHuZuv.png",
        attractions: attractionsSelector,
        description: descriptionSelector,
        scheduled: dateSelector,
        number_tickets: capacitySelector
    }

    let okToEdit = confirm("Tem certeza que deseja editar este evento?");

    if(okToEdit){
       const editou =  await axios
       .put(`${baseURL}/events/${ID}`, corpo)    
            .then(() => console.log(JSON.stringify(corpo)))
            .then(() => alert('Evento Editado com Sucesso'))
            .then(() => window.location.href = "admin.html")
            .catch((error) => alert('Não foi possível realizar a edição deste evento, tente novamente'));
    }    
}

