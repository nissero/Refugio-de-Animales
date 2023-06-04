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
    constructor(titulo, perfilAnimal, telefono, tipoAviso, img) {
        this.titulo = titulo;
        this.perfilAnimal = perfilAnimal;
        this.telefono = telefono;
        this.tipoAviso = tipoAviso;
        this.img = img;
    }
}

class AvisoAdopcion extends Aviso {
    constructor(titulo, perfilAnimal, telefono, tipoAviso, img, cuidados) {
        super(titulo, perfilAnimal, telefono, tipoAviso, img)
        this.cuidados = cuidados;

    }
}

class avisoPerdidoEncontrado extends Aviso {
    constructor(titulo, perfilAnimal, telefono, tipoAviso, img, direccion, fecha) {
        super(titulo, perfilAnimal, telefono, tipoAviso, img)
        this.direccion = direccion;
        this.fecha = fecha;
    }
}


////////////////////////////////////////////////////////////////////////
const contenerDeProcutos = document.getElementById('cuerpoHTML');
contenerDeProcutos.classList.add("segurosMostrados")
const adopcion = "adopcion";
const perdido = "perdido";
let avisos = [];

function exportarJson() {
    return new Promise((resolve, reject) => {
      let ret = [];
      let listaaviso = [];
      fetch("../Js/avisos.json")
        .then(response => response.json())
        .then(data => {
          listaaviso = data;
          listaaviso.forEach((aviso) => {
            if (aviso.tipoAviso == "Adopcion") {
              ret.push(new AvisoAdopcion(aviso.titulo, aviso.perfilAnimal, aviso.telefono, aviso.tipoAviso, aviso.img, aviso.cuidados));
            } else if (aviso.tipoAviso == "perdidoEncontrado") {
              ret.push(new avisoPerdidoEncontrado(aviso.titulo, aviso.perfilAnimal, aviso.telefono, aviso.tipoAviso, aviso.img, aviso.direccion, aviso.fecha));
            }
          });
          resolve(ret); // Devolver el array cuando esté completo
        })
        .catch(error => {
          reject(error); // Manejar el error en caso de que ocurra
        });
    });
}

exportarJson().then(nuevoArrayAvisos => {
    avisos = nuevoArrayAvisos;
    console.log(avisos);
    prueba();
});


function prueba(){
    avisos.forEach((aviso) => {
                const div = document.createElement(`div`)
                console.log(1);
                const image = document.createElement("img")
                image.src = aviso.img
                //const image = document.createElement("img")
                //  image.src = seguro.img
                //image.classList.add("imagenSeguro")
                if (aviso.tipoAviso == "Adopcion"){
                    div.innerHTML = 
                    `<div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${aviso.img}" class="img-fluid rounded-start" alt="..."> 
                            </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title"> ${aviso.titulo}</h5>
                                <p class="card-text">Tipo de aviso: ${aviso.tipoAviso}</p>
                                <p class="card-text">Perfil del animal: ${aviso.perfilAnimal}</p>
                                <p class="card-text"><small class="text-muted">  Cuidados: ${aviso.cuidados}  </small></p>
                                <p class="card-text"><small class="text-muted">  Contacto: ${aviso.telefono}  </small></p>
                            </div>
                        </div>
                    </div>
                </div>`
                contenerDeProcutos.append(div)
            }
            else if (aviso.tipoAviso == "perdidoEncontrado"){
                div.innerHTML = 
                                `<div class="card mb-3" style="max-width: 540px;">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src="${aviso.img}" class="img-fluid rounded-start" alt="..."> 
                                        </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title"> ${aviso.titulo}</h5>
                                            <p class="card-text">Tipo de aviso: ${aviso.tipoAviso}</p>
                                            <p class="card-text">Perfil del animal: ${aviso.perfilAnimal}</p>
                                            <p class="card-text"><small class="text-muted">  Fecha de encuentro: ${aviso.fecha}  </small></p>
                                            <p class="card-text"><small class="text-muted">  Contacto: ${aviso.telefono}  </small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                contenerDeProcutos.append(div)
            }
                
    })
}

function añadirAvisoAlDoc() {
    let listaaviso = [];
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
                div.innerHTML = 
                                `<div class="card mb-3" style="max-width: 540px;">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src="${aviso.img}" class="img-fluid rounded-start" alt="..."> 
                                        </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title"> ${aviso.titulo}</h5>
                                            <p class="card-text">Tipo de aviso: ${aviso.tipoAviso}</p>
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
}






