const { error } = require('console');
const fs = require('fs');


// leer archivo JSon con FIleSystem
let data = fs.readFileSync('./Js/organizaciones.json')


let organizaciones = JSON.parse(data);


//console.log(organizaciones)

// Leer con JsonData
// require es una funcion sincronica, solo se llama una vez
//let jsonData = require('./Js/organizaciones.json');



// escribir en un JSON


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

