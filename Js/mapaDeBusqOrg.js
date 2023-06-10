import * as metodosMapa from './metodosMapa.js';

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

map = metodosMapa.crearMapa();
exportarJson().then(arrayDeMarkers => {
    markers = arrayDeMarkers;
    checkVet();
    checkRefugio();
    checkpeluqueria();
    filtrado();
    metodosMapa.añadirMarkers(markersFiltrados, map);
});

function checkRefugio() {
    var filtroRefugio = document.querySelector("input[name=refugio]");
    filtroRefugio.addEventListener('change', function () {
        if (this.checked) {
            filtrorefugioIsChecked = true;
            return filtrorefugioIsChecked;
        }
        else {
          filtrorefugioIsChecked = false;
            return filtrorefugioIsChecked;
        }
    });
}

function checkVet() {
    var filtroVet = document.querySelector("input[name=Veterinaria]");
    filtroVet.addEventListener('change', function () {
        if (this.checked) {
            filtroVeterinariaIsChecked = true;
            return filtroVeterinariaIsChecked;
        }
        else {
          filtroVeterinariaIsChecked = false;
            return filtroVeterinariaIsChecked;
        }
    });
}

function checkpeluqueria() {
  var filtroPeluqueria = document.querySelector("input[name=peluqueria]");
  filtroPeluqueria.addEventListener('change', function () {
      if (this.checked) {

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
    metodosMapa.removerMarkers(map);
    checkVet();
    checkRefugio();
    checkpeluqueria();
    filtrado();
    if (filtroVeterinariaIsChecked || filtropeluqueriaIsChecked || filtrorefugioIsChecked){
        metodosMapa.añadirMarkers(markersFiltrados, map);
    }
    else{
        metodosMapa.removerMarkers(map);
    }
    
}

function mostrarTodasLasOrg(){
    metodosMapa.removerMarkers(map);
    metodosMapa.añadirMarkers(markers, map);
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
                    if (org.destacado){
                        var redIcon = new L.Icon({
                            iconUrl: 'https://i0.wp.com/eltallerdehector.com/wp-content/uploads/2022/07/estrella-mario-bros-png-transparente.png?fit=800%2C800&ssl=1', // URL de la imagen del marcador
                            iconSize: [25, 41], // Tamaño del icono
                            iconAnchor: [12, 41], // Punto de anclaje del icono
                            popupAnchor: [0, -41] // Punto de anclaje del popup asociado al icono
                          });
                        var mark = new L.marker([org.direccion[0].coordenadas.x, org.direccion[0].coordenadas.y], { veterinaria, refugio, peluqueria, icon: redIcon})
                          .bindPopup('<br> DESTACADA <br>'+'<img src="' + img + '" alt="Imagen" width='+ width + '"height="' + height + '">"' + '<br>' + "Nombre: " + org.nombre +
                          "<br>Descripción: "+ org.descripcion + "<br>Direccion: " + org.direccion[0].direccion + ', '
                              + org.direccion[0].nombre_localidad + '<br>Actividades:<br>  ' + mensajePopup).openPopup()
                      ret.push(mark);
                    }
                    else{
                        var mark = new L.marker([org.direccion[0].coordenadas.x, org.direccion[0].coordenadas.y], { veterinaria, refugio, peluqueria})
                        .bindPopup('<img src="' + img + '" alt="Imagen" width='+ width + '"height="' + height + '">"' + '<br>' + "Nombre: " + org.nombre +
                        "<br>Descripción: "+ org.descripcion + "<br>Direccion: " + org.direccion[0].direccion + ', '
                            + org.direccion[0].nombre_localidad + '<br>Actividades:<br>  ' + mensajePopup).openPopup()
                    ret.push(mark);
                    }
                });
                resolve(ret);
            })
            .catch(error => {
                reject(error);
            })
    })
}