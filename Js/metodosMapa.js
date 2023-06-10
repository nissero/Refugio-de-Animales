export function crearMapa() {
    var mapa = L.map('map').setView([-34.52299128711134, -58.700488331227234], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapa);

    return mapa;
}

export function removerMarkers(mapa){
    mapa.eachLayer(function(layer) {
  if (layer instanceof L.Marker) {
    mapa.removeLayer(layer);
  }
});
}

export function añadirMarkers(arrDeMarkers, mapa) {
    console.log(arrDeMarkers)
    arrDeMarkers.forEach((marker)=>{
        marker.addTo(mapa);
    })
}