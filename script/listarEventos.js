// não há necessidade de usar axios no projeto, pois quando for atribuir os valores que retornam da API pode encontrar dificuldade, usa o fetch que fica mais fácil
// manipular e criar a table com os dados

// sugestão

const body = document.querySelector('body');
const tbody = document.querySelector('#tabela-eventos');
const loading = document.querySelector('#loading');

const BASE_URL = 'https://soundgarden-api.vercel.app';

axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';


const baseURL = "https://soundgarden-api.vercel.app";



window.onload = function() {
    console.log("rodei onload");
    loadEvents();
  };


// Sugestão para sua função loadEvents()
// criar um tryctach que se encarregara de fazer a req e tratar a exeption caso haja

body.onload = async () => {
    try {
        const responseEvents = await fetch(`${BASE_URL}/events`, { method: "GET" });
        const contentResponseEvents = await responseEvents.json();
        loading.style.display = "none";

        for (let i = 0; i < 6; i++) {
            const finalDate = new Date(contentResponseEvents[i].scheduled);

            tbody.insertAdjacentHTML("beforeend", `
                <tr>
                    <th scope="row">
                        ${i + 1}
                    </th>
                    <td>
                        ${finalDate.toLocaleDateString('en-GB')}
                    </td>
                    <td>
                        ${contentResponseEvents[i].name}
                    </td>
                    <td>
                        ${contentResponseEvents[i].attractions}
                    </td>
                    <td>
                        <a href="bookings.html?id=${contentResponseEvents[i]._id}" class="btn btn-dark">
                        Check bookings</a>
                        <a href="edit-event.html?id=${contentResponseEvents[i]._id}" class="btn btn-secondary">Edit</a>
                        <a href="delete-event.html?id=${contentResponseEvents[i]._id}" class="btn btn-danger">Delete</a>
                    </td>
                </tr>
            `);
        };

    } catch (error) {
        console.log(error);
        loading.style.display = "none";
        alert('Error!!!');
    };
};


//FUNCTION THAT UPDATES THE EVENTS TO THE DOM
function loadEvents(){
    let eventos;
    //AXIOS gets all the events from the api
    axios({//GET is blocked in the browser due to CORS policy °~°
        method: "get",
        url: `${baseURL}//events`,
        params:{
            _limit: 5
        }
    })
    .then(response => {
        eventos = response;
        console.log(response);//debug only
    })//logs to the console. Can be a success message
    .catch(error => console.log(error)); 


    //HERE, THE CARDS ARE ACTUALY GENERATED WITH THE REAL DATA
   for (let i = 0; i < eventos.length; i++ ){
        createCard(eventos[i]);
   }
};


//FUNCTION THAT CREATES THE CARDS
function createCard(element){
    document.getElementById('divEventos').innerHTML = `
    <article class="evento card p-5 m-3">
                    <h2>${element.name} - ${element.scheduled}</h2>
                    <h4>${element.attractions}</h4>
                    <p>${element.discription}</p>
                    <a href="$" class="btn btn-primary">reservar ingresso</a>
                </article>
    `
}
