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
        //const image = document.createElement("img")
        //  image.src = seguro.img
        //image.classList.add("imagenSeguro")
        div.innerHTML = `<div class="card mb-3" style="max-width: 540px;">

        <div class="row g-0">
          <div class="col-md-4">
          <img src="${org.img}" class="img-fluid rounded-start" alt="..."> 
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">  Nombre ONG:  ${org.nombre}</h5>
              <p class="card-text">Descripcion : ${org.descripcion}</p>
              <p class="card-text">Actividades : ${org.actividades}</p>
              <p class="card-text">Direccion : ${org.direccion}</p>
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
