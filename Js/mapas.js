var map;
let markers = [];
let markersFiltrados = [];
const boton = document.getElementById("actualizar-organizacion");
boton.addEventListener('click', mostrarOrganizacionFiltrada);
const verTodosLosMarkers = document.getElementById("ver-todo");
verTodosLosMarkers.addEventListener('click', mostrarTodasLasOrg);

var filtroVeterinariaIsChecked = true;
var filtropeluqueriaIsChecked = true;
var filtrorefugioIsChecked = true;

crearMapa();
exportarJson().then(arrayDeMarkers => {
    markers = arrayDeMarkers;
    checkVet();
    checkRefugio();
    checkpeluqueria();
    filtrado();
    añadirMarkers(markersFiltrados);
});

function checkRefugio() {
    var filtroRefugio = document.querySelector("input[name=refugio]");
    filtroRefugio.addEventListener('change', function () {
        if (this.checked) {
            // filtroPerdidoIsChecked = true;
            console.log("check refugio");
            filtrorefugioIsChecked = true;
            return filtrorefugioIsChecked;
        }
        else {
          filtrorefugioIsChecked = false;
            return filtrorefugioIsChecked;
        }
    });
}


function checkpeluqueria() {
  var filtroPeluqueria = document.querySelector("input[name=peluqueria]");
  filtroPeluqueria.addEventListener('change', function () {
      if (this.checked) {
          // filtroPerdidoIsChecked = true;
          console.log("check peluqueria");
          filtropeluqueriaIsChecked = true;
          return filtropeluqueriaIsChecked;
      }
      else {
        filtropeluqueriaIsChecked = false;
          return filtropeluqueriaIsChecked;
      }
  });
}

function mostrarOrganizacionFiltrada() {
    removerMarkers();
    checkVet();
    checkRefugio();
    checkpeluqueria();
    filtrado();
    if (filtroVeterinariaIsChecked || filtropeluqueriaIsChecked || filtrorefugioIsChecked){
        añadirMarkers(markersFiltrados);
    }
    
}

function mostrarTodasLasOrg(){
    console.log("mostrar todos los markers");
    removerMarkers();
    añadirMarkers(markers);
}

function filtrado() {
    if (filtroVeterinariaIsChecked && filtropeluqueriaIsChecked
        && filtrorefugioIsChecked) {
        markersFiltrados = markers.filter(marker =>
            marker.options.veterinaria || marker.options.peluqueria || marker.options.refugio)
    }
    //VER vete si y pelu si
    else if (filtroVeterinariaIsChecked && filtropeluqueriaIsChecked
        && !filtrorefugioIsChecked) {
        markersFiltrados = markers.filter(marker =>
            (marker.options.veterinaria || marker.options.peluqueria));
    }
    // VER vet si, pelu no , refu si
    else if (filtroVeterinariaIsChecked && !filtropeluqueriaIsChecked
        && filtrorefugioIsChecked) {

        markersFiltrados = markers.filter(marker =>
            marker.options.veterinaria || marker.options.refugio);
    }
    // VER pelu si, pelu NO, refu NO
    else if (filtroVeterinariaIsChecked && !filtropeluqueriaIsChecked
        && !filtrorefugioIsChecked) {
        markersFiltrados = markers.filter(marker =>
            marker.options.veterinaria);
    }
    //VER Vete no, PELU SI, REFU SI
    else if (!filtroVeterinariaIsChecked && filtropeluqueriaIsChecked
        && filtrorefugioIsChecked) {

        markersFiltrados = markers.filter(marker =>
            marker.options.peluqueria || marker.options.refugio);
    }
    // VER vete NO, pelu SI, refu NO
    else if (!filtroVeterinariaIsChecked && filtropeluqueriaIsChecked
        && !filtrorefugioIsChecked) {

        markersFiltrados = markers.filter(marker =>
            marker.options.peluqueria);
    }
    //VETE NO, PELU NO, REFU SI
    else if (!filtroVeterinariaIsChecked && !filtropeluqueriaIsChecked
        && filtrorefugioIsChecked) {

        markersFiltrados = markers.filter(marker =>
            marker.options.refugio);
    }
}



function crearMapa() {
    map = L.map('map').setView([-34.52299128711134, -58.700488331227234], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

function removerMarkers(){
    map.eachLayer(function(layer) {
  if (layer instanceof L.Marker) {
    map.removeLayer(layer);
  }
});
}

function añadirMarkers(arrDeMarkers) {
    console.log("añadiendo markers");
    console.log(markersFiltrados);
    arrDeMarkers.forEach((marker)=>{
        marker.addTo(map);
    })
}

function exportarJson() {
    return new Promise((resolve, reject) => {
        let ret = [];
        let organizaciones = [];
        fetch("../Js/organizaciones.json")
            .then(response => response.json())
            .then(data => {
                organizaciones = data;
                organizaciones.forEach((org) => {
                    var mensajePopup = "";
                    var veterinaria = false;
                    var peluqueria = false;
                    var refugio = false;
                    var img = org.img;
                    var width = 75;
                    var height = 75;
                    if (org.veterinaria) {
                        mensajePopup = mensajePopup + " Es veterinaria<br>"
                        veterinaria = true;
                    }
                    if (org.peluqueria) {
                        mensajePopup = mensajePopup + " Es peluqueria<br>"
                        peluqueria = true;
                    }
                    if (org.refugio) {
                        mensajePopup = mensajePopup + " Es un refugio <br>"
                        refugio = true;
                    }
                    var mark = new L.marker([org.direccion[0].coordenadas.x, org.direccion[0].coordenadas.y], { veterinaria, refugio, peluqueria})
                        .bindPopup('<img src="' + img + '" alt="Imagen" width='+ width + '"height="' + height + '">"' + '<br>' + "Nombre: " + org.nombre +
                        "<br>Descripción: "+ org.descripcion + "<br>Direccion: " + org.direccion[0].direccion + ', '
                            + org.direccion[0].nombre_localidad + '<br>Actividades:<br>  ' + mensajePopup).openPopup()
                    ret.push(mark);
                });
                resolve(ret);
            })
            .catch(error => {
                reject(error);
            })
    })
}