var mimapa = L.map('mapa').setView([-34.52302221777237, -58.70044541652767], 20);

L.tileLayer('https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png', {
    attribution: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | <a href="http://www.ign.gob.ar/AreaServicios/Argenmap/IntroduccionV2" target="_blank">Instituto Geográfico Nacional</a> + <a href="http://www.osm.org/copyright" target="_blank">OpenStreetMap</a>',
    minZoom: 1,
    maxZoom: 16
}).addTo(mimapa);

//hola tios como estan
//buenas tardes

$(document).ready(function name(params) {
    console.log("cargado");
    
    let botonenviar= $("#enviar");
    let despues="hola"
    
 
    botonenviar.click(function name(params) {
        var inputElement = document.getElementById("direccion");
        var valor = inputElement.value;
        console.log(valor); 
        despues=valor 
        
    })
    console.log(despues)
 });

try{
    var n = usig.NormalizadorDirecciones.init();
    var opts = n.normalizar("julio", 10);
}
catch(error){
    console.log(error.to);
}
