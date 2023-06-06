var map;
let markers = [];

crearMapa();
exportarJson().then(arrayDeMarkers => {
    markers = arrayDeMarkers;
    añadirMarkers();
});

function crearMapa(){
    map = L.map('map').setView([-34.52299128711134, -58.700488331227234], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
}

function añadirMarkers(){
    markers.forEach((marker) => {
        map.addLayer(marker);
    })
}

function exportarJson(){
    return new Promise((resolve, reject) =>{
        let ret = [];
        let organizaciones = [];
        fetch("../Js/organizaciones.json")
        .then(response => response.json())
        .then(data => {
            organizaciones = data;
            organizaciones.forEach((org)=> {
                var mensajePopup;
                console.log(org.direccion[0].coordenadas);
                if (org.veterinaria){
                    mensajePopup = mensajePopup + " Es veterinaria<br>"
                }
                if (org.peluqueria){
                    mensajePopop = mensajePopup + " Es peluqueria<br>"
                }
                if (org.refugio){
                    mensajePopup = mensajePopup + " Es un refugio <br>"
                }
                mark = new L.marker([org.direccion[0].coordenadas.x, org.direccion[0].coordenadas.y])
                .addTo(map)
                .bindPopup("Nombre: " + org.nombre + "<br>Direccion: " + org.direccion[0].direccion + ', ' 
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