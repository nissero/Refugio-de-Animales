// creamos los obejtos de avisos

class Aviso {
    constructor(titulo, perfilAnimal, telefono, tipoAviso, img, tipo) {
        this.titulo = titulo;
        this.perfilAnimal = perfilAnimal;
        this.telefono = telefono;
        this.tipoAviso = tipoAviso;
        this.img = img;
        this.tipo = tipo;
    }
}

class AvisoAdopcion extends Aviso {
    constructor(titulo, perfilAnimal, telefono, tipoAviso, img, tipo, cuidados) {
        super(titulo, perfilAnimal, telefono, tipoAviso, img, tipo)
        this.cuidados = cuidados;

    }
}

class avisoPerdidoEncontrado extends Aviso {
    constructor(titulo, perfilAnimal, telefono, tipoAviso, img, tipo, direccion, fecha) {
        super(titulo, perfilAnimal, telefono, tipoAviso, img, tipo)
        this.direccion = direccion;
        this.fecha = fecha;
    }
}


////////////////////////////////////////////////////////////////////////
const contenerDeProcutos = document.getElementById('cuerpoHTML');
contenerDeProcutos.classList.add("segurosMostrados")
let filtroPerdidoIsChecked = true;
let filtroAdopcionIsChecked = true;
let filtroIsPerroIsChecked = true;
let filtroIsGatoIsChecked = true;
let filtroIsTortugaIsChecked = true;
let filtroIsAveIsChecked = true;
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
                        ret.push(new AvisoAdopcion(aviso.titulo, aviso.perfilAnimal, aviso.telefono, aviso.tipoAviso, aviso.img, aviso.tipo, aviso.cuidados));
                    } else if (aviso.tipoAviso == "perdidoEncontrado") {
                        ret.push(new avisoPerdidoEncontrado(aviso.titulo, aviso.perfilAnimal, aviso.telefono, aviso.tipoAviso, aviso.img, aviso.tipo, aviso.direccion, aviso.fecha));
                    }
                });
                resolve(ret); // Devolver el array cuando esté completo
            })
            .catch(error => {
                reject(error); // Manejar el error en caso de que ocurra
            });
    });
}

function checkAdopcion() {
    var filtroAdopcion = document.querySelector("input[name=adopcion]");
    filtroAdopcion.addEventListener('change', function () {
        if (this.checked) {
            console.log("check adopcion");
            filtroAdopcionIsChecked = true;
            return filtroAdopcionIsChecked;
        }
        else {
            filtroAdopcionIsChecked = false;
            return filtroAdopcionIsChecked;
        }
    });
}

function checkPerdido() {
    var filtroPerdido = document.querySelector("input[name=perdida]");
    filtroPerdido.addEventListener('change', function () {
        if (this.checked) {
            // filtroPerdidoIsChecked = true;
            console.log("check perdida");
            filtroPerdidoIsChecked = true;
            return filtroPerdidoIsChecked;
        }
        else {
            filtroPerdidoIsChecked = false;
            return filtroPerdidoIsChecked;
        }
    });
}


// check de si es perro
function checkPerro() {
    var filtroPerro = document.querySelector("input[name=perro]");
    filtroPerro.addEventListener('change', function () {
        if (this.checked) {
            // filtroPerdidoIsChecked = true;
            console.log("check perro");
            filtroIsPerroIsChecked = true;
            return filtroIsPerroIsChecked;
        }
        else {
            filtroIsPerroIsChecked = false;
            return filtroIsPerroIsChecked;
        }
    });
}

// check de si es gato
function checkGato() {
    var filtroGato = document.querySelector("input[name=gato]");
    filtroGato.addEventListener('change', function () {
        if (this.checked) {
            // filtroPerdidoIsChecked = true;
            console.log("check gato");
            filtroIsGatoIsChecked = true;
            return filtroIsGatoIsChecked;
        }
        else {
            filtroIsGatoIsChecked = false;
            return filtroIsGatoIsChecked;
        }
    });
}

// check de si es tortuga
function checkTortuga() {
    var filtrotortuga = document.querySelector("input[name=tortuga]");
    filtrotortuga.addEventListener('change', function () {
        if (this.checked) {
            // filtroPerdidoIsChecked = true;
            console.log("check tortuga");
            filtroIsTortugaIsChecked = true;
            return filtroIsTortugaIsChecked;
        }
        else {
            filtroIsTortugaIsChecked = false;
            return filtroIsTortugaIsChecked;
        }
    });
}
// check de si es ave
function checkAve() {
    var filtroAve = document.querySelector("input[name=ave]");
    filtroAve.addEventListener('change', function () {
        if (this.checked) {
            // filtroPerdidoIsChecked = true;
            console.log("check ave");
            filtroIsAveIsChecked = true;
            return filtroIsAveIsChecked;
        }
        else {
            filtroIsAveIsChecked = false;
            return filtroIsAveIsChecked;
        }
    });
}





exportarJson().then(nuevoArrayAvisos => {
    avisos = nuevoArrayAvisos;
});

function mostrarAvisos() {
    contenerDeProcutos.innerHTML = "";
    checkAdopcion();
    checkPerdido();
    checkPerro();
    checkGato();
    checkTortuga();
    checkAve();
    // 1 ver todos
    if (filtroAdopcionIsChecked && filtroPerdidoIsChecked && filtroIsPerroIsChecked
        && filtroIsGatoIsChecked && filtroIsTortugaIsChecked && filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos);
    }

    // 2 todos menos tortuga
    else if (filtroAdopcionIsChecked && filtroPerdidoIsChecked && filtroIsPerroIsChecked
        && filtroIsGatoIsChecked && !filtroIsTortugaIsChecked && filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipo != "tortuga"));
    }
    // 3 todos menos ave
    else if (filtroAdopcionIsChecked && filtroPerdidoIsChecked && filtroIsPerroIsChecked
        && filtroIsGatoIsChecked && filtroIsTortugaIsChecked && !filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipo != "ave"));
    }

    // 4 todos menos ave y tortuga
    else if (filtroAdopcionIsChecked && filtroPerdidoIsChecked && filtroIsPerroIsChecked
        && filtroIsGatoIsChecked && !filtroIsTortugaIsChecked && !filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipo != "ave" && Aviso.tipo != "tortuga"));
    }
    // 5 todo menos gato
    else if (filtroAdopcionIsChecked && filtroPerdidoIsChecked && filtroIsPerroIsChecked
        && !filtroIsGatoIsChecked && filtroIsTortugaIsChecked && filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipo != "gato"));
    }
    //6  todo - gato y tortuga
    else if (filtroAdopcionIsChecked && filtroPerdidoIsChecked && filtroIsPerroIsChecked
        && !filtroIsGatoIsChecked && !filtroIsTortugaIsChecked && filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipo != "gato" && Aviso.tipo != "tortuga"));
    }
    // 7 todo - gato y ave
    else if (filtroAdopcionIsChecked && filtroPerdidoIsChecked && filtroIsPerroIsChecked
        && !filtroIsGatoIsChecked && filtroIsTortugaIsChecked && !filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipo != "gato" && Aviso.tipo != "ave"));
    }
    // 8 todo - gato y ave y tortuga
    else if (filtroAdopcionIsChecked && filtroPerdidoIsChecked && filtroIsPerroIsChecked
        && !filtroIsGatoIsChecked && !filtroIsTortugaIsChecked && !filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipo != "gato" && Aviso.tipo != "ave"
            && Aviso.tipo != "tortuga"));
    }
    // 9 todo - perro
    else if (filtroAdopcionIsChecked && filtroPerdidoIsChecked && !filtroIsPerroIsChecked
        && filtroIsGatoIsChecked && filtroIsTortugaIsChecked && filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipo != "perro"));
    }
    // 10 todo - perro y tortuga
    else if (filtroAdopcionIsChecked && filtroPerdidoIsChecked && !filtroIsPerroIsChecked
        && filtroIsGatoIsChecked && !filtroIsTortugaIsChecked && filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipo != "perro" && Aviso.tipo != "tortuga"));
    }
    // 11 todo - perro y ave
    else if (filtroAdopcionIsChecked && filtroPerdidoIsChecked && !filtroIsPerroIsChecked
        && filtroIsGatoIsChecked && filtroIsTortugaIsChecked && !filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipo != "perro" && Aviso.tipo != "ave"));
    }
    // 12 todo - perro y ave y tortuga
    else if (filtroAdopcionIsChecked && filtroPerdidoIsChecked && !filtroIsPerroIsChecked
        && filtroIsGatoIsChecked && !filtroIsTortugaIsChecked && !filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipo != "perro" && Aviso.tipo != "ave" && Aviso.tipo != "tortuga"));
    }
    // 13 todo - perro y gato
    else if (filtroAdopcionIsChecked && filtroPerdidoIsChecked && !filtroIsPerroIsChecked
        && !filtroIsGatoIsChecked && filtroIsTortugaIsChecked && filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipo != "perro" && Aviso.tipo != "gato"));
    }
    // 14 todo - gato y perro y tortuga
    else if (filtroAdopcionIsChecked && filtroPerdidoIsChecked && !filtroIsPerroIsChecked
        && !filtroIsGatoIsChecked && !filtroIsTortugaIsChecked && filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipo != "gato" && Aviso.tipo != "perro"
            && Aviso.tipo != "tortuga"));
    }
    // 15 todo - gato y perro y ave
    else if (filtroAdopcionIsChecked && filtroPerdidoIsChecked && !filtroIsPerroIsChecked
        && !filtroIsGatoIsChecked && filtroIsTortugaIsChecked && !filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipo != "gato" && Aviso.tipo != "perro"
            && Aviso.tipo != "ave"));
    }
    // 16 todo - gato y perro y ave y tortuga
    else if (filtroAdopcionIsChecked && filtroPerdidoIsChecked && !filtroIsPerroIsChecked
        && !filtroIsGatoIsChecked && !filtroIsTortugaIsChecked && !filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipo != "gato" && Aviso.tipo != "perro"
            && Aviso.tipo != "ave" && Aviso.tipo != "tortuga"));
    }
    // 17 no Adopcion
    else if (!filtroAdopcionIsChecked && filtroPerdidoIsChecked && filtroIsPerroIsChecked
        && filtroIsGatoIsChecked && filtroIsTortugaIsChecked && filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipoAviso != "Adopcion"));
    }
    // 18todos - Adopcion y tortuga
    else if (!filtroAdopcionIsChecked && filtroPerdidoIsChecked && filtroIsPerroIsChecked
        && filtroIsGatoIsChecked && !filtroIsTortugaIsChecked && filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipoAviso != "Adopcion"
            && Aviso.tipo != "tortuga"));
    }
    // 19todos - Adopcion y ave
    else if (!filtroAdopcionIsChecked && filtroPerdidoIsChecked && filtroIsPerroIsChecked
        && filtroIsGatoIsChecked && filtroIsTortugaIsChecked && !filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso.tipoAviso != "Adopcion"
            && Aviso.tipo != "ave"));
    }

    // 20 - no adopcion y ave y tortuga
    else if (!filtroAdopcionIsChecked && filtroPerdidoIsChecked && filtroIsPerroIsChecked
        && filtroIsGatoIsChecked && filtroIsTortugaIsChecked && !filtroIsAveIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso.tipoAviso != "Adopcion"
            && Aviso.tipo != "ave" && Aviso.tipo != "tortuga"));
    }








    // ver solo perdido
    else if (!filtroAdopcionIsChecked && filtroPerdidoIsChecked) {
        //    añadirAvisosAdopcionAlDoc( avisosPerdidos = avisos.filter(Aviso => Aviso.tipoAviso == "perdidoEncontrado"));


    }
    else {
        console.log("no hizo nada")
    }
}

const botonActualizar = document.getElementById("actualizar");
botonActualizar.addEventListener("click", mostrarAvisos);

function añadirAvisosAdopcionAlDoc(avisosAMostrar) {
    avisosAMostrar.forEach((aviso) => {
        const div = document.createElement(`div`)
        div.classList.add('aviso');
        const image = document.createElement("img")
        image.src = aviso.img
        if (aviso.tipoAviso == "Adopcion") {

            div.innerHTML =
                `<div class="card" style="width: 18rem;">
            <img src="${aviso.img}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${aviso.titulo}</h5>
              <p class="card-text">${aviso.perfilAnimal}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${aviso.titulo}</li>
              <li class="list-group-item">${aviso.tipo}</li>
              <li class="list-group-item">${aviso.cuidados}</li>
              <li class="list-group-item">${aviso.telefono}</li>
            </ul>
          </div>`
        }

        else if (aviso.tipoAviso == "perdidoEncontrado") {

            div.innerHTML =
                `<div class="card" style="width: 18rem;">
        <img src="${aviso.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${aviso.titulo}</h5>
          <p class="card-text">${aviso.tipoAviso}</p>
          <p class="card-text">${aviso.perfilAnimal}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${aviso.titulo}</li>
          <li class="list-group-item">${aviso.tipo}</li>
          <li class="list-group-item">${aviso.fecha}</li>
          <li class="list-group-item">${aviso.direccion}</li>
          <li class="list-group-item">${aviso.telefono}</li>
        </ul>
      </div>`

        }

        contenerDeProcutos.append(div)

    })
}


