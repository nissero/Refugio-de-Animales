// Call the dataTables jQuery plugin
$(document).ready(function() {
    //on ready
});


async function registrarUsuarios(){
      let datos = {}; //el merge no autocompleta el id
      datos.nombre = document.getElementById('txtNombre').value;
      datos.apellido = document.getElementById('txtApellido').value;
      datos.mail = document.getElementById('txtEmail').value;
      datos.contraseña = document.getElementById('txtPassword').value;
      datos.telefono = null;
      let repetirPassword=document.getElementById('txtRepetirPassword').value;

      if(repetirPassword != datos.contraseña){
        alert('La contraseña que escribiste es diferente');
        return;
        }

      const request = await fetch('api/usuarios', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)

      });



 }
