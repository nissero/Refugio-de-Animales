var map;
let markers = [];

crearMapa();

function crearMapa(){
    map = L.map('map').setView([-34.52299128711134, -58.700488331227234], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
}