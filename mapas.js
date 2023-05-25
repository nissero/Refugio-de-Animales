

//hola tios como estan
//buenas tardes
function main() {
  
 
  let inpu = document.getElementById("b");
  
  inpu.addEventListener("keyup", (event)=>{
    var di= "http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=" + document.getElementById("b").value;
    getFromURL(di,listarUsuarios);
    actualizarDirecciones();
  });
  
}


function actualizarDirecciones() { //actualiza dirreciones mientras escribe
    var lista = document.getElementById("lista-usuarios");
    var elementos = lista.getElementsByTagName("li");
    
    // Recorre los elementos en sentido inverso para evitar problemas con los índices
    for (var i = elementos.length - 1; i >= 0; i--) {
      if ((i + 1) % 2 === 0) { // Verifica si el índice es par
        lista.removeChild(elementos[i]);
      }
    }
    
}


function getFromURL(url, callback) {

  let xhttp = new XMLHttpRequest();


  xhttp.onreadystatechange = function() {

      if ( xhttp.readyState == 4 && xhttp.status == 200) {
          let response = JSON.parse(xhttp.responseText);
          callback(response);
      }
  }

 /*xhttp.addEventListener("load", response => {

  let result = JSON.parse(response.currentTarget.responseText);
  console.log(result);*/

 

  xhttp.open("GET", url,true);
  xhttp.send();

}


function listarUsuarios(response) {
  let lista = document.getElementById("lista-usuarios");
  response.direccionesNormalizadas.forEach(usuario => {
      let item = document.createElement("li");

      item.append(usuario.direccion);

      lista.append(item);
      
  });
}