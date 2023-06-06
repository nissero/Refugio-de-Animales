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
                console.log(org.direccion[0].coordenadas);
                ret.push(new L.marker([org.direccion[0].coordenadas.x, org.direccion[0].coordenadas.y])
                .addTo(map)
                .bindPopup(org.nombre + ", " + org.direccion[0].nombre_calle + ', ' 
                + org.direccion[0].nombre_partido + ', ' + org.direccion[0].nombre_localidad).openPopup());
            });
            resolve(ret);
        })
        .catch(error => {
            reject(error);
        })
    })
}