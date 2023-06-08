
/***************************************************

                 ISAAC ESTEVE AQUI °-°
                    
****************************************************/


axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';


const baseURL = "https://soundgarden-api.vercel.app";



window.onload = function() {
    console.log("rodei onload");
    loadEvents();
  };

//FUNCTION THAT UPDATES THE EVENTS TO THE DOM
function loadEvents(){
    let eventos;
    //AXIOS gets all the events from the DB
    axios({
        method: "get",
        url: `${baseURL}/events`       
    },  {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        eventos = response;
        console.log("DADOS RETORNADOS: ", response);//debug only
         //HERE, THE CARDS ARE ACTUALY GENERATED WITH THE REAL DATA
        for (let i = 0; i < eventos.data.length; i++ ){
            createCard(eventos.data[i]. i);
       }
    })//logs to the console. Can be a success message
    .catch(error => console.log(error));    
};


//FUNCTION THAT CREATES THE CARDS
function createCard(element, i){
    document.getElementById('listaAdmin').insertAdjacentHTML("beforeEnd", `
    <tr>
    <th scope="row">${i+1}</th>
    <td>${element.scheduled}</td>
    <td>${element.name}</td>
    <td>${element.attractions}</td>
    <td>
        <a href="reservas.html" class="btn btn-dark">ver reservas</a>
        <a href="editar.html" class="btn btn-secondary">editar</a>
        <a href="editar.html" class="btn btn-danger">excluir</a>
    </td>
    </tr>
    `);
}
