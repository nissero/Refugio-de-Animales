import * as metodosMapa from './Js/metodosMapa.js';



//hola tios como estan
//buenas tardes

var map;
var markers = [];
map = metodosMapa.crearMapa();
let inpu = document.getElementById("Direccion"); //b es la direccion a buscar que viene del input
inpu.addEventListener("keyup", normalizar); // cada vez que ingresa una letra
let mensaje = document.getElementById("mensaje");
mensajes("Escribe una direccion");


function normalizar() {
  var di = "http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=" + document.getElementById("Direccion").value;
  getFromURL(di, añadirDirecciones);
  actualizarDirecciones();
  mensajes("");
}

function mensajes(Texto) {
  mensaje.innerHTML = "<p>" + Texto + "<p>";
}

function actualizarDirecciones() { //actualiza dirreciones mientras escribe
  var lista = document.getElementById("lista-direcciones");
  var elementos = lista.getElementsByTagName("li");

  // Recorre los elementos en sentido inverso para evitar problemas con los índices
  for (var i = elementos.length - 1; i >= 0; i--) {
    lista.removeChild(elementos[i]);
  }

}


function getFromURL(url, callback) {

  let xhttp = new XMLHttpRequest();


  xhttp.onreadystatechange = function () {

    if (xhttp.readyState == 4 && xhttp.status == 200) {

      let response = JSON.parse(xhttp.responseText);

      callback(response);
    }
  }

  /*xhttp.addEventListener("load", response => {
 
   let result = JSON.parse(response.currentTarget.responseText);
   console.log(result);*/



  xhttp.open("GET", url, true);
  xhttp.send();

}


function añadirDirecciones(response) {

  let lista = document.getElementById("lista-direcciones");
  console.log(response);
  var direcciones = response.direccionesNormalizadas
  var tieneAltura = false;
  direcciones.forEach(direccion =>{
    if (direccion.altura != null){
      tieneAltura = true;
    }
  });
  if (direcciones.length == 0){
    mensajes("Error: Direción incorrecta!")
  }
  else if (!tieneAltura){
    mensajes("Te falta ingresar una altura!")
  }
  else if (tieneAltura){
    cargarMarkers(direcciones);
    metodosMapa.removerMarkers(map);
    metodosMapa.añadirMarkers(markers, map)
  }
  else if (direcciones.length > 1){
    mensajes("Encontre mas de una direccion, elije una")
  }
  else{
    mensajes("Bien!")
  }

  direcciones.forEach(usuario => {
    let item = document.createElement("li");
    let button = document.createElement("button");
    button.classList.add("boton");

    button.innerText = usuario.direccion;

    button.addEventListener("click", function () {
      // Acciones a realizar cuando se hace clic en el botón

      let input = document.getElementById("Direccion");
      input.value = button.innerText;

      // Aquí puedes agregar la lógica adicional que deseas ejecutar al hacer clic en el botón dentro de la lista.
    });


    item.append(button);

    if (!lista.contains(item)) {
      lista.append(item);
    }
  });
}


function cargarMarkers(direcciones){
  direcciones.forEach((org) => {
    if(org.coordenadas !=null ){
    console.log(org.direccion.coordenadas);
    var marker = new L.marker([org.coordenadas.y, org.coordenadas.x])
    .bindPopup(org.direccion + ', '+ org.nombre_localidad).openPopup()
    markers.push(marker);
    }
  })
}