// creamos los obejtos de avisos
class perfilAnimal {
    constructor(nombre, raza, edad, descripcion, img) {
        this.nombre = nombre;
        this.raza = raza;
        this.edad = edad;
        this.descripcion = descripcion;
        this.img = img;
    }
}


class Aviso {
    constructor(perfilAnimal, telefono, tipoAviso, img) {
        this.perfilAnimal = perfilAnimal;
        this.telefono = telefono;
        this.tipoAviso = tipoAviso;
        this.img = img;
    }
}

class AvisoAdopcion extends Aviso {
    constructor(perfilAnimal, telefono, tipoAviso, img , cuidados) {
        super(perfilAnimal, telefono, tipoAviso, img )
        this.cuidados = cuidados;

    }
}

class avisoPerroPerdido extends Aviso {
    constructor(perfilAnimal, telefono, tipoAviso, img, direccion, fecha) {
        super(perfilAnimal, telefono, tipoAviso, img )
        this.direccion = direccion;
        this.fecha = fecha;
    }
}


////////////////////////////////////////////////////////////////////////
const contenerDeProcutos = document.getElementById('cuerpoHTML');
contenerDeProcutos.classList.add("segurosMostrados")
const adopcion = "adopcion";
const perdido = "perdido";
let listaaviso = []



fetch("../Js/avisos.json")
.then(response => response.json())
.then(data => {
    listaaviso = data;
    listaaviso.forEach((aviso) => {


        const div = document.createElement(`div`)
        const image = document.createElement("img")
        image.src = aviso.img
        //const image = document.createElement("img")
        //  image.src = seguro.img
        //image.classList.add("imagenSeguro")
        div.innerHTML = `<div class="card mb-3" style="max-width: 540px;">

        <div class="row g-0">
          <div class="col-md-4">
          <img src="${aviso.img}" class="img-fluid rounded-start" alt="..."> 
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">  Tipo de Aviso:  ${aviso.tipoAviso}</h5>
              <p class="card-text">Perfil del animal: ${aviso.perfilAnimal}</p>
              <p class="card-text"><small class="text-muted">  Cuidados: ${aviso.cuidados}  </small></p>
              <p class="card-text"><small class="text-muted">  Contacto: ${aviso.telefono}  </small></p>

            </div>
          </div>
        </div>
      </div>`


        contenerDeProcutos.append(div)
        
        //       if(seguro.tipoAviso == adopcion){
        //     }
    })
})





