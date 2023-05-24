

//hola tios como estan
//buenas tardes
function main() {
  let inpu = document.getElementById("b");
  inpu.addEventListener("keyup", (event)=>{
    var di= "http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=" + document.getElementById("b").value;
    getFromURL(di,listarUsuarios);
  });
  
  //https://jsonplaceholder.typicode.com/users

  //getUsuariosSincrono();
  //getUsuariosASincrono();
  //var di= "http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=" + document.getElementById("b").value;
  //getFromURL(di,listarUsuarios);

}
function getUsuariosASincrono(){

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=function() {
    if(xhttp.readyState == 4 && xhttp.status==200 ){
      let response = JSON.parse(xhttp.responseText);
      console.log(response);
    }
  }
  xhttp.open("GET", "http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=julio", true)
  xhttp.send();

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

function getUsuariosSincrono(){
  let xhttp = new XMLHttpRequest();

  xhttp.open("GET", "http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=julio", false);
  xhttp.send();

  if (xhttp.status == 200) {
      let response = JSON.parse(xhttp.responseText);
      
      listarUsuarios(response);
  }
}

function listarUsuarios(response) {
  let lista = document.getElementById("lista-usuarios");
  response.direccionesNormalizadas.forEach(usuario => {
      let item = document.createElement("li");

      item.append(usuario.direccion);

      lista.append(item);
      
  });
}