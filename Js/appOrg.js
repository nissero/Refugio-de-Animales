class organizacion{
    constructor(nombre, descripcion,actividades,direccion,horarios,telefono,img){
        this.nombre = nombre
        this.descripcion = descripcion
        this.actividades = actividades
        this.direccion = direccion
        this.horarios = horarios
        this.telefono = telefono
        this.img = img
    }
}
var filtroVeterinariaIsChecked = false;
var filtropeluqueriaIsChecked = false;
var filtrorefugioIsChecked = false;

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

//var filtroVeterinariaIsChecked = false;
//var filtropeluqueriaIsChecked = false;
//var filtrorefugioIsChecked = false;
let organizacionFiltrados =[];
let organizaciones = [];


function filtrarOrganizaciones() {
  checkVet();
  checkRefugio();
  checkpeluqueria();

  
  // falta completar con los objetos organizacion

  console.log("entro")
  // Ver todos
  if (filtroVeterinariaIsChecked && filtropeluqueriaIsChecked 
    && filtrorefugioIsChecked) {
    organizacionFiltrados = organizaciones.filter(Organizacion => 
      Organizacion.veterinaria && Organizacion.peluqueria && Organizacion.refugio);
      
     
  }
  //VER vete si y pelu si
  else if (filtroVeterinariaIsChecked && filtropeluqueriaIsChecked 
    && !filtrorefugioIsChecked) {
      organizacionFiltrados = organizaciones.filter(Organizacion => 
        Organizacion.veterinaria && Organizacion.peluqueria && !Organizacion.refugio);

  }
  // VER vet si, pelu no , vet si
  else if (filtroVeterinariaIsChecked && !filtropeluqueriaIsChecked 
    && filtrorefugioIsChecked){

      organizacionFiltrados = organizaciones.filter(Organizacion => 
        Organizacion.veterinaria && !Organizacion.peluqueria && Organizacion.refugio);

  }
// VER pelu si, pelu NO, refu NO
  else if (filtroVeterinariaIsChecked && !filtropeluqueriaIsChecked 
    && !filtrorefugioIsChecked) {
      organizacionFiltrados = organizaciones.filter(Organizacion => 
        Organizacion.veterinaria && !Organizacion.peluqueria && !Organizacion.refugio);

  }
  //VER Vete no, PELU SI, REFU SI
  else if (!filtroVeterinariaIsChecked && filtropeluqueriaIsChecked 
    && filtrorefugioIsChecked){

      organizacionFiltrados = organizaciones.filter(Organizacion => 
        !Organizacion.veterinaria && Organizacion.peluqueria && Organizacion.refugio);

  }
  // VER vete NO, pelu SI, refu NO
    else if (!filtroVeterinariaIsChecked && filtropeluqueriaIsChecked 
    && !filtrorefugioIsChecked){

      organizacionFiltrados = organizaciones.filter(Organizacion => 
        !Organizacion.veterinaria && Organizacion.peluqueria && !Organizacion.refugio);

  }
  //VETE NO, PELU NO, REFU SI
  else if (!filtroVeterinariaIsChecked && !filtropeluqueriaIsChecked 
    && filtrorefugioIsChecked){

      organizacionFiltrados = organizaciones.filter(Organizacion => 
        !Organizacion.veterinaria && !Organizacion.peluqueria && Organizacion.refugio);

  }
// NO VER NADA
  else if (!filtroVeterinariaIsChecked && !filtropeluqueriaIsChecked 
    && !filtrorefugioIsChecked){
      organizacionFiltrados = organizaciones.filter(Organizacion => 
        !Organizacion.veterinaria && !Organizacion.peluqueria && !Organizacion.refugio);

  }

  else{
      console.log("no hizo nada")
  }
}




const botonActualizar = document.getElementById("actualizar-organizacion");
//botonActualizar.addEventListener("click", mostrarmostrarOrganizacionFiltradaAvisos);

function mostrarOrganizacionFiltrada(){
  contenerDeProcutos.innerHTML ="";
  filtrarOrganizaciones()

}






function mostrarOrganizacionRegistrada(){

  var actualizarOrganizaciones = document.getElementById("actualizar-organizacion");
  actualizarOrganizaciones.addEventListener('click', function(e){

    console.log(organizacionJSON);
    
  })

}
 



const contenerDeProcutos = document.getElementById('cuerpoOrg');
let listaOrg = []

fetch("../Js/organizaciones.json")
.then(response => response.json())
.then(data => {
    listaOrg = data;
    listaOrg.forEach((org) => {


        const div = document.createElement(`div`)
        const image = document.createElement("img")
        image.src = org.img
        div.innerHTML = `<div class="card mb-3" style="max-width: 540px;">

        <div class="row g-0">
          <div class="col-md-4">
          <img src="${org.img}" class="img-fluid rounded-start" alt="..."> 
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">  Nombre ONG:  ${org.nombre}</h5>
              <p class="card-text">Descripcion : ${org.descripcion}</p>
              <p class="card-text">veterinaria : ${org.veterinaria}</p>
              <p class="card-text">refugio : ${org.refugio}</p>
              <p class="card-text">peluqueria : ${org.peluqueria}</p>
              <p class="card-text">Direccion : ${org.direccion[0].direccion}</p>
              <p class="card-text">Horarios : ${org.horarios}</p>
              <p class="card-text">Telefono : ${org.telefono}</p>

            </div>
          </div>
        </div>
      </div>`


        contenerDeProcutos.append(div)
        
        //       if(seguro.tipoAviso == adopcion){
        //     }
    })
})

