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

