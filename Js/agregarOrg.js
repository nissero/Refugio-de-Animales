//crear el JSON vacio
let organizacionesNuevas = {};

// evento que escuche el "summit" del formulario para registrar ORG
var formulario = document.getElementById("agregar-organizacion");


var veterinariaOrg = "no";
var refugioOrg = "no";
var peluqueriaOrg = "no";

formulario.addEventListener('click', function (event) {
  event.preventDefault();


  var checkVet = document.getElementById("veterinaria-organizacion");
  var checkRefugio = document.getElementById("refugio-organizacion");
  var checkPeluqueria = document.getElementById("peluqueria-organizacion");


  if (checkVet.checked) {
    veterinariaOrg = "si";
  } else if (!checkVet.checked) {
    veterinariaOrg = "no";

  }

  if (checkRefugio.checked) {
    refugioOrg = "si";
  } else if (!checkRefugio.checked) {
    refugioOrg = "no";

  }

  if (checkPeluqueria.checked) {
    peluqueriaOrg = "si";
  } else if (!checkPeluqueria.checked) {
    peluqueriaOrg = "no";

  }





  var nombreORg = document.getElementById("nombre-organizacion").value;
  var descripcionOrg = document.getElementById("descripcion-organizacion").value;

  var direccionOrg = document.getElementById("Direccion").value;
  var horariosOrg = document.getElementById("horarios-organizacion").value;
  var telefonoOrg = document.getElementById("telefono-organizacion").value;
  var imgOrg = document.getElementById("img-organizacion").value;

  var nuevaOrg = {
    nombre: nombreORg, descripcion: descripcionOrg, veterinaria: veterinariaOrg,
    refugioOrg: refugioOrg, peluqueria: peluqueriaOrg, direccion: direccionOrg,
    horarios: horariosOrg, telefono: telefonoOrg, img: imgOrg
  };

  // convirtiendo a JSON
  const organizacionJSON = JSON.stringify(nuevaOrg);



  if (nombreORg == "" || descripcionOrg == "" || descripcionOrg == "" || horariosOrg == "" || telefonoOrg == ""
    || imgOrg == "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `El formulario esta incompleto`
    })
  } else {
    Swal.fire({
      
    Image: './Images/fondo.jpg',
      
    text: `PERFECTO! Solicitud de registro agregada correctamente,
    Sus datos: 
    nombre: ${nombreORg}
    descripcion: ${descripcionOrg}
    veterinaria: ${veterinariaOrg}
    refugio: ${refugioOrg}
    peluqueria: ${peluqueriaOrg}
    Direccion: ${direccionOrg}
    horarios: ${horariosOrg}
    telefono: ${telefonoOrg}
    Img: link de IMG guardado.
    `});


  }


})
