// creamos los obejtos de avisos

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
let filtroPerdidoIsChecked = true;
let filtroAdopcionIsChecked = true;
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



exportarJson().then(nuevoArrayAvisos => {
    avisos = nuevoArrayAvisos;
    console.log(avisos);
    console.log(avisosPerdidos);
    console.log(avisosAdopcion);
});

function mostrarAvisos() {
    contenerDeProcutos.innerHTML ="";
    checkAdopcion();
    checkPerdido();
    console.log("entro")
    // ver todos
    if (filtroAdopcionIsChecked && filtroPerdidoIsChecked) {
        console.log("los dos")
      añadirAvisosAdopcionAlDoc(avisos);
    }

    // ver solo adopcion
    else if (filtroAdopcionIsChecked && !filtroPerdidoIsChecked) {
        añadirAvisosAdopcionAlDoc(avisos.filter(Aviso => Aviso.tipoAviso == "Adopcion"));


    }
    // ver solo perdido
    else if (!filtroAdopcionIsChecked && filtroPerdidoIsChecked){
        añadirAvisosAdopcionAlDoc( avisosPerdidos = avisos.filter(Aviso => Aviso.tipoAviso == "perdidoEncontrado"));


    }
    else{
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
        div.innerHTML =
            `<div class="card" style="width: 18rem;">
            <img src="${aviso.img}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${aviso.titulo}</h5>
              <p class="card-text">${aviso.perfilAnimal}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${aviso.titulo}</li>
              <li class="list-group-item">${aviso.cuidados}</li>
              <li class="list-group-item">${aviso.telefono}</li>
            </ul>
          </div>`
        contenerDeProcutos.append(div)

    })
}


