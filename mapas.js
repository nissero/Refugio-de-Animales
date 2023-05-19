var mimapa = L.map('mapa').setView([-34.52302221777237, -58.70044541652767], 20);

L.tileLayer('https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png', {
    attribution: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | <a href="http://www.ign.gob.ar/AreaServicios/Argenmap/IntroduccionV2" target="_blank">Instituto Geográfico Nacional</a> + <a href="http://www.osm.org/copyright" target="_blank">OpenStreetMap</a>',
    minZoom: 1,
    maxZoom: 16
}).addTo(mimapa);

//hola tios como estan