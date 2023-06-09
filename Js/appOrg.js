class organizacion{
    constructor(nombre, descripcion,veterinaria,refugio,peluqueria,direccion,horarios,telefono,img){
        this.nombre = nombre
        this.descripcion = descripcion
        this.direccion = direccion
        this.horarios = horarios
        this.telefono = telefono
        this.img = img
        this.veterinaria=veterinaria
        this.refugio=refugio
        this.peluqueria=peluqueria
    }
}
const contenerDeProcutos = document.getElementById('cuerpoOrg');
var filtroVeterinariaIsChecked = true;
var filtropeluqueriaIsChecked = true;
var filtrorefugioIsChecked = true;



function checkVet() {
    var filtroVet = document.querySelector("input[name=Veterinaria]");
    filtroVet.addEventListener('change', function () {
        if (this.checked) {
            console.log("check Veterinaria");
            filtroVeterinariaIsChecked = true;
            return filtroVeterinariaIsChecked;
        }
        else {
          filtroVeterinariaIsChecked = false;
            return filtroVeterinariaIsChecked;
        }
    });
}


function checkRefugio() {
    var filtroRefugio = document.querySelector("input[name=refugio]");
    filtroRefugio.addEventListener('change', function () {
        if (this.checked) {
            // filtroPerdidoIsChecked = true;
            console.log("check refugio");
            filtrorefugioIsChecked = true;
            return filtrorefugioIsChecked;
        }
        else {
          filtrorefugioIsChecked = false;
            return filtrorefugioIsChecked;
        }
    });
}


function checkpeluqueria() {
  var filtroPeluqueria = document.querySelector("input[name=peluqueria]");
  filtroPeluqueria.addEventListener('change', function () {
      if (this.checked) {
          // filtroPerdidoIsChecked = true;
          console.log("check peluqueria");
          filtropeluqueriaIsChecked = true;
          return filtropeluqueriaIsChecked;
      }
      else {
        filtropeluqueriaIsChecked = false;
          return filtropeluqueriaIsChecked;
      }
  });
}


let organizacionFiltrados =[];
let organizaciones = [];


const buscador = document.getElementById("buscador");
const inputBusqueda = document.getElementById("inputBusqueda");

buscador.addEventListener("click", function(){

  contenerDeProcutos.innerHTML ="";
  var org = [];
  var valor = inputBusqueda.value;
  valor = valor.toLowerCase();

 organizaciones.forEach((organ)=>{

  let nombre = organ.nombre
  nombre = nombre.toLowerCase();
  //console.log(nombre)

  if(nombre.includes(valor))  {
    org.push(organ)
  }
 })

 añadirOrganizacionesAldoc(org)


})





function filtrarOrganizaciones() {
  checkVet();
  checkRefugio();
  checkpeluqueria();

  
  console.log("entro")
  
  
  // Ver todos
  if (filtroVeterinariaIsChecked && filtropeluqueriaIsChecked 
    && filtrorefugioIsChecked) {
    organizacionFiltrados = organizaciones.filter(Organizacion => 
      Organizacion.veterinaria || Organizacion.peluqueria || Organizacion.refugio)
      
      console.log(organizacionFiltrados)
      añadirOrganizacionesAldoc(organizacionFiltrados)
     
  }
  //VER vete si y pelu si
  else if (filtroVeterinariaIsChecked && filtropeluqueriaIsChecked 
    && !filtrorefugioIsChecked) {
      organizacionFiltrados = organizaciones.filter(Organizacion => 
        (Organizacion.veterinaria || Organizacion.peluqueria) );
        console.log(organizacionFiltrados)
        añadirOrganizacionesAldoc(organizacionFiltrados)
  }
  // VER vet si, pelu no , refu si
  else if (filtroVeterinariaIsChecked && !filtropeluqueriaIsChecked 
    && filtrorefugioIsChecked){

      organizacionFiltrados = organizaciones.filter(Organizacion => 
        Organizacion.veterinaria || Organizacion.refugio);
        console.log(organizacionFiltrados)
        añadirOrganizacionesAldoc(organizacionFiltrados)
  }
// VER pelu si, pelu NO, refu NO
  else if (filtroVeterinariaIsChecked && !filtropeluqueriaIsChecked 
    && !filtrorefugioIsChecked) {
      organizacionFiltrados = organizaciones.filter(Organizacion => 
        Organizacion.veterinaria);
        console.log(organizacionFiltrados)
        añadirOrganizacionesAldoc(organizacionFiltrados)
  }
  //VER Vete no, PELU SI, REFU SI
  else if (!filtroVeterinariaIsChecked && filtropeluqueriaIsChecked 
    && filtrorefugioIsChecked){

      organizacionFiltrados = organizaciones.filter(Organizacion => 
        Organizacion.peluqueria || Organizacion.refugio);
        console.log(organizacionFiltrados)
        añadirOrganizacionesAldoc(organizacionFiltrados)
  }
  // VER vete NO, pelu SI, refu NO
    else if (!filtroVeterinariaIsChecked && filtropeluqueriaIsChecked 
    && !filtrorefugioIsChecked){

      organizacionFiltrados = organizaciones.filter(Organizacion => 
        Organizacion.peluqueria );
        console.log(organizacionFiltrados)
        añadirOrganizacionesAldoc(organizacionFiltrados)
  }
  //VETE NO, PELU NO, REFU SI
  else if (!filtroVeterinariaIsChecked && !filtropeluqueriaIsChecked 
    && filtrorefugioIsChecked){

      organizacionFiltrados = organizaciones.filter(Organizacion => 
       Organizacion.refugio);
        console.log(organizacionFiltrados)
        añadirOrganizacionesAldoc(organizacionFiltrados)
  }

  else{
      console.log("no hizo nada")
  }
}




const botonActualizar = document.getElementById("actualizar-organizacion");
const verTodasLasOrg = document.getElementById("ver-todo");


verTodasLasOrg.addEventListener('click', function(){
  contenerDeProcutos.innerHTML ="";
  mostrarTodasLasOrg();
})

function mostrarOrganizacionFiltrada(){
  console.log("hola")
  checkVet();
  checkRefugio();
  checkpeluqueria();
  contenerDeProcutos.innerHTML ="";
  filtrarOrganizaciones();

}






// function mostrarOrganizacionRegistrada(){

  var actualizarOrganizaciones = document.getElementById("actualizar-organizacion");
  botonActualizar.addEventListener('click',mostrarOrganizacionFiltrada)
//   actualizarOrganizaciones.addEventListener('click', function(e){

//     console.log(organizacionJSON);
    
//   })

// }

function añadirOrganizacionesAldoc(orgFiltro){
  

  orgFiltro.forEach((organ)=>{
    console.log(orgFiltro)
    const div = document.createElement(`div`)
        const image = document.createElement("img")
        image.src = organ.img
        div.innerHTML = `<div class="card mb-3" style="max-width: 540px;">

        <div class="row g-0">
          <div class="col-md-4">
          <img src="${organ.img}" class="img-fluid rounded-start" alt="..."> 
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">  Nombre ONG:  ${organ.nombre}</h5>
              <p class="card-text">Descripcion : ${organ.descripcion}</p>
              <p class="card-text">veterinaria : ${organ.veterinaria}</p>
              <p class="card-text">refugio : ${organ.refugio}</p>
              <p class="card-text">peluqueria : ${organ.peluqueria}</p>
              <p class="card-text">Direccion : ${organ.direccion[0].direccion}</p>
              <p class="card-text">Horarios : ${organ.horarios}</p>
              <p class="card-text">Telefono : ${organ.telefono}</p>

            </div>
          </div>
        </div>
      </div>`


        contenerDeProcutos.append(div)
  })
}

function mostrarTodasLasOrg(){
  

  organizaciones.forEach((organ)=>{
    console.log(organizacionFiltrados)
    const div = document.createElement(`div`)
        const image = document.createElement("img")
        image.src = organ.img
        div.innerHTML = `<div class="card mb-3" style="max-width: 540px;">

        <div class="row g-0">
          <div class="col-md-4">
          <img src="${organ.img}" class="img-fluid rounded-start" alt="..."> 
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">  Nombre ONG:  ${organ.nombre}</h5>
              <p class="card-text">Descripcion : ${organ.descripcion}</p>
              <p class="card-text">veterinaria : ${organ.veterinaria}</p>
              <p class="card-text">refugio : ${organ.refugio}</p>
              <p class="card-text">peluqueria : ${organ.peluqueria}</p>
              <p class="card-text">Direccion : ${organ.direccion[0].direccion}</p>
              <p class="card-text">Horarios : ${organ.horarios}</p>
              <p class="card-text">Telefono : ${organ.telefono}</p>

            </div>
          </div>
        </div>
      </div>`


        contenerDeProcutos.append(div)
  })
}
 
 




let listaOrg = []

exportarJson().then(nuevoArrayOrgas => {
  organizaciones = nuevoArrayOrgas;
  console.log(organizaciones);
  console.log(organizacionFiltrados);

  
  
});


function exportarJson() {
  return new Promise((resolve, reject) => {
      let ret = [];
      let listaorg = [];
      fetch("../Js/organizaciones.json")
          .then(response => response.json())
          .then(data => {
              listaorg = data;
              listaorg.forEach((orga) => {
                  
                      ret.push(new organizacion(orga.nombre, orga.descripcion, orga.veterinaria, orga.refugio, orga.peluqueria, orga.direccion,orga.horarios,orga.telefono,orga.img));   
              });
              resolve(ret); // Devolver el array cuando esté completo
          })
          .catch(error => {
              reject(error); // Manejar el error en caso de que ocurra
          });
  });
}

 
