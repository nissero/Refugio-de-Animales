

//const { error } = require('console');


console.log("hola");

//console.log(organizaciones)

// Leer con JsonData
// require es una funcion sincronica, solo se llama una vez
//let jsonData = require('./Js/organizaciones.json');
//window.onload = cargarEventos();
//window.onload = cargarEventos();

//const fs = require('fs')
//let data = fs.readFileSync('./Js/organizaciones.json')
//let organizaciones = JSON.parse(data);

const botonAgreagarOrganizacion = document.getElementById("agregar-organizacion");
//botonAgreagarOrganizacion.addEventListener("submit", nuevaOrg);
botonAgreagarOrganizacion.addEventListener("click", nuevaOrg);







function nuevaOrg(event) {
    event.preventDefault();



    console.log("entre");



    var nombreORg = document.getElementById("nombre-organizacion").value;
    var descripcionOrg = document.getElementById("descripcion-organizacion").value;
    var actividadesOrg = document.getElementById("actividades-organizacion").value;
    var direccionOrg = document.getElementById("direccion-organizacion").value;
    var horariosOrg = document.getElementById("horarios-organizacion").value;
    var telefonoOrg = document.getElementById("telefono-organizacion").value;
    var imgOrg = document.getElementById("img-organizacion").value;


    var nuevaOrg = {
        nombre: nombreORg, descripcion: descripcionOrg, actividades: actividadesOrg
        , direccion: direccionOrg, horarios: horariosOrg, telefono: telefonoOrg, img: imgOrg
    };

    console.log("antes fetch");


    fetch('../Js/organizaciones.json', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail: 'pp@pp.com', password: '123' })
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        });



    fetch("../Js/organizaciones.json", {
        method: "POST",
        body: JSON.stringify(nuevaOrg)
    })



    console.log("sali");


    // let nuevaData = organizaciones.push(nuevaOrg);
    // nuevaData = JSON.stringify(organizaciones);
};

















// escribir en un JSON

/*
let asd =
    {
        "nombre": "PRUEBAAAAAAA",
        "descripcion": "ONG venta de porno",
        "actividades": "bañar en poringa",
        "direccion": "calle falsa 123",
        "horarios": "08 a 20",
        "telefono": "123456789",
        "img": "https://pbs.twimg.com/profile_images/1055482679808933889/Ksz-ichO_400x400.jpg"

    }
    ;

let a = [{
    "hola": "holahola"
}];



let nuevaData = organizaciones.push(asd);
nuevaData = JSON.stringify(organizaciones);

console.log( nuevaData );


// agregar al JSON




fs.writeFileSync('./Js/organizaciones.json',nuevaData, (error) => {
    if(error){
        console.log("Error: ${error}")
    }
    else{
        console.log('CORRECTOOO')
    }
}

);
*/
