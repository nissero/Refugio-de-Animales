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
let filtroPerdidoIsChecked = true;
let filtroAdopcionIsChecked = true;
let avisos = [];
let avisosPerdidos = [];
let avisosAdopcion = [];

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

function filtrarPerdido() {
    avisosPerdidos = avisos.filter(Aviso => Aviso.tipoAviso == "perdidoEncontrado");

}

function filtrarAdopcion() {
    avisosAdopcion = avisos.filter(Aviso => Aviso.tipoAviso == "Adopcion");
}

exportarJson().then(nuevoArrayAvisos => {
    avisos = nuevoArrayAvisos;
    console.log(avisos);
    console.log(avisosPerdidos);
    console.log(avisosAdopcion);
    filtrarPerdido();
    filtrarAdopcion();
    mostrarAvisos();
});

function mostrarAvisos() {
    contenerDeProcutos.innerHTML ="";
    checkAdopcion();
    checkPerdido();
    console.log("entro")
    if (filtroAdopcionIsChecked && filtroPerdidoIsChecked) {
        console.log("los dos")
        añadirAvisosAdopcionAlDoc();
        añadirAvisosPerdidaAlDoc();
    }
    else if (filtroAdopcionIsChecked && !filtroPerdidoIsChecked) {
        console.log("adocpion")
        añadirAvisosAdopcionAlDoc();
    }
    else if (!filtroAdopcionIsChecked && filtroPerdidoIsChecked){
        console.log("perdido")
        añadirAvisosPerdidaAlDoc();
    }
    else{
        console.log("no hizo nada")
    }
}

const botonActualizar = document.getElementById("actualizar");
botonActualizar.addEventListener("click", mostrarAvisos);

function añadirAvisosAdopcionAlDoc() {
    avisosAdopcion.forEach((aviso) => {
        const div = document.createElement(`div`)
        console.log(3);
        const image = document.createElement("img")
        image.src = aviso.img
        //const image = document.createElement("img")
        //  image.src = seguro.img
        //image.classList.add("imagenSeguro")
        console.log(323432432);
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
    })
}

function añadirAvisosPerdidaAlDoc() {
    avisosPerdidos.forEach((aviso2) => {
        const div = document.createElement(`div`)
        console.log("imprimendo avisos de perdida");
        const image = document.createElement("img")
        image.src = aviso2.img
        div.innerHTML =
                `<div class="card mb-3" style="max-width: 540px;">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src="${aviso2.img}" class="img-fluid rounded-start" alt="..."> 
                                        </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title"> ${aviso2.titulo}</h5>
                                            <p class="card-text">Tipo de aviso: ${aviso2.tipoAviso}</p>
                                            <p class="card-text">Perfil del animal: ${aviso2.perfilAnimal}</p>
                                            <p class="card-text"><small class="text-muted">  Fecha de encuentro: ${aviso2.fecha}  </small></p>
                                            <p class="card-text"><small class="text-muted">  Contacto: ${aviso2.telefono}  </small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>`
            contenerDeProcutos.append(div)
    })
}

function añadirAvisoAlDoc() {
    avisos.forEach((aviso) => {
        const div = document.createElement(`div`)
        console.log(3);
        const image = document.createElement("img")
        image.src = aviso.img
        //const image = document.createElement("img")
        //  image.src = seguro.img
        //image.classList.add("imagenSeguro")
        if (aviso.tipoAviso == "Adopcion") {
            console.log(323432432);
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
        else if (aviso.tipoAviso == "perdidoEncontrado") {
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








