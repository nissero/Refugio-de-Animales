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
    constructor(perfilAnimal, telefono, tipoAviso) {
        this.perfilAnimal = perfilAnimal;
        this.telefono = telefono;
        this.tipoAviso = tipoAviso;
    }
}

class AvisoAdopcion extends Aviso {
    constructor(perfilAnimal, telefono, cuidados, tipoAviso) {
        super(perfilAnimal, telefono, tipoAviso)
        this.cuidados = cuidados;

    }
}

class avisoPerroPerdido extends Aviso {
    constructor(perfilAnimal, telefono, tipoAviso, direccion, fecha) {
        super(perfilAnimal, telefono, tipoAviso)
        this.direccion = direccion;
        this.fecha = fecha;
    }
}


////////////////////////////////////////////////////////////////////////
const contenerDeProcutos = document.getElementById('cuerpoHTML');
contenerDeProcutos.classList.add("segurosMostrados")
const adopcion = "adopcion";
const perdido = "perdido";

const mostrarSeguros = async () => {
    console.log("jasoooooooooooooon");

    fetch("./Js/avisos.json")
        .then(response => response.json())
        .then(data => {
            listaSeguros = data;
            listaSeguros.forEach((seguro) => {
                const div = document.createElement(`div`)
                //const image = document.createElement("img")
                //  image.src = seguro.img
                //image.classList.add("imagenSeguro")




                div.innerHTML = ` <h4 class="">  el TELEFONO $ ${seguro.telefono}</h4>
                    <hr>`
                contenerDeProcutos.append(div)


                //       if(seguro.tipoAviso == adopcion){

                //     }






            })
        })
}



