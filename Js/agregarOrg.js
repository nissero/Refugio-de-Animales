//crear el JSON vacio
let organizacionesNuevas = {};

// evento que escuche el "summit" del formulario para registrar ORG
var formulario = document.getElementById("agregar-organizacion");



formulario.addEventListener('click', function(event){
  event.preventDefault();

  var nombreORg = document.getElementById("nombre-organizacion").value;
    var descripcionOrg = document.getElementById("descripcion-organizacion").value;
    var veterinariaOrg = document.getElementById("veterinaria-organizacion").value;
    var refugioOrg = document.getElementById("refugio-organizacion").value;
    var peluqueriaOrg = document.getElementById("peluqueria-organizacion").value;
    var direccionOrg = document.getElementById("b").value;
    var horariosOrg = document.getElementById("horarios-organizacion").value;
    var telefonoOrg = document.getElementById("telefono-organizacion").value;
    var imgOrg = document.getElementById("img-organizacion").value;

    var nuevaOrg = {
      nombre: nombreORg, descripcion: descripcionOrg, veterinaria: veterinariaOrg,
      refugioOrg: refugioOrg, peluqueria: peluqueriaOrg , direccion: direccionOrg,
      horarios: horariosOrg, telefono: telefonoOrg, img: imgOrg
  };

  // convirtiendo a JSON
 const organizacionJSON = JSON.stringify(nuevaOrg);

  console.log(organizacionJSON);

  console.log(veterinariaOrg.value)

  if(nombreORg == "" || descripcionOrg == "" || descripcionOrg == "" || horariosOrg == "" || telefonoOrg == ""
  || imgOrg == "" ){
               Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `El formulario esta incompleto`
              })
  }else{
    Swal.fire(`PERFECTO! Solicitud de registro agregada correctamente,
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
    `);
  

  }


})
