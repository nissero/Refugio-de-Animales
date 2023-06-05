//crear el JSON vacio
let organizacionesNuevas = {}

// evento que escuche el "summit" del formulario para registrar ORG
var formulario = document.getElementById("agregar-organizacion");

formulario.addEventListener('click', function(event){
  event.preventDefault();

  var nombreORg = document.getElementById("nombre-organizacion").value;
    var descripcionOrg = document.getElementById("descripcion-organizacion").value;
    var actividadesOrg = document.getElementById("actividades-organizacion").value;
    var direccionOrg = document.getElementById("direccion-organizacion").value;
    var horariosOrg = document.getElementById("horarios-organizacion").value;
    var telefonoOrg = document.getElementById("telefono-organizacion").value;
    var imgOrg = document.getElementById("img-organizacion").value;

    var nuevaOrg = {
      nombre: nombreORg, descripcion: descripcionOrg, actividades: actividadesOrg
      , direccion: direccionOrg, horarios: horariosOrg, telefono: telefonoOrg, img: imgOrg
  };

  // convirtiendo a JSON
 const organizacionJSON = JSON.stringify(nuevaOrg);

  console.log(organizacionJSON);


})
