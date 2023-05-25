
 var map;
//hola tios como estan
//buenas tardes
function main() {
  crearMapa();

  let inpu = document.getElementById("b");

  
 

  inpu.addEventListener("keyup", (event) => {
    var di = "http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=" + document.getElementById("b").value;
    getFromURL(di, listarUsuarios);
    actualizarDirecciones();
  });

}


function presionoEnter(a,b) {
  $("#b").keypress(function (e) {
    if (e.which == 13) {
      
    }
  });
}

function actualizarDirecciones() { //actualiza dirreciones mientras escribe
  var lista = document.getElementById("lista-usuarios");
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
      console.log(response);
      callback(response);
    }
  }

  /*xhttp.addEventListener("load", response => {
 
   let result = JSON.parse(response.currentTarget.responseText);
   console.log(result);*/



  xhttp.open("GET", url, true);
  xhttp.send();

}


function listarUsuarios(response) {
  let lista = document.getElementById("lista-usuarios");
  var direcciones = response.direccionesNormalizadas;
  console.log(direcciones.length);
  direcciones.forEach(usuario => {
    let item = document.createElement("li");

    item.append(usuario.direccion);
    lista.append(item);

    });
  
  if (direcciones.length == 1){
    if (direcciones[0].altura !=null ) {
      marcarEnMapa(direcciones[0]);
    }
    
  }

}

function marcarEnMapa(direccion){
  map.setView([direccion.coordenadas.y, direccion.coordenadas.x], 13);
 /* L.marker([direccion.coordenadas.x, direccion.coordenadas.y]).addTo(map).bindPopup(direccion.nombre_calle + ', ' + direccion.nombre_partido + ', ' + direccion.nombre_localidad).openPopup(); */
}

function crearMapa() {
  map = L.map('map').setView([-34.52299128711134, -58.700488331227234], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      L.marker([-34.52299128711134, -58.700488331227234]).addTo(map).bindPopup('Universidad Nacional de General Sarmiento').openPopup();
}

