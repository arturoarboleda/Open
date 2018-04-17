firebase.initializeApp({
    apiKey: "AIzaSyBJCzX59Yf4WDRC014H8K5ysMwcBaW5w-Y",
    authDomain: "seminario-e4a10.firebaseapp.com",
    databaseURL: "https://seminario-e4a10.firebaseio.com",
    projectId: "seminario-e4a10",
    storageBucket: "seminario-e4a10.appspot.com",
    messagingSenderId: "361309725251"

  });
 
  // Agregar Documento

   // Initialize Cloud Firestore through Firebase
   var db = firebase.firestore();

  function guardar() {
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var direccion = document.getElementById('direccion').value;
    var telefono = document.getElementById('telefono').value;

    db.collection("clientes").add({
            nombre: nombre,
            email: email,
            direccion: direccion,
            telefono: telefono
        })
        
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('nombre').value = '';
            document.getElementById('email').value = '';
            document.getElementById('direccion').value = '';
            document.getElementById('telefono').value = '';
            
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });


       

}
 //------------------leerr datos-------------//
 var tabla = document.getElementById('tabla');
 db.collection("clientes").onSnapshot((querySnapshot) => {
     tabla.innerHTML = '';
     querySnapshot.forEach((doc) => {
         console.log(`${doc.id} => ${doc.data().nombre}`);
         tabla.innerHTML += `
         <tr>
         <th scope="row">${doc.id}</th>  
         <td>${doc.data().nombre}</td>  
         <td>${doc.data().email}</td>  
         <td>${doc.data().direccion}</td>  
         <td>${doc.data().telefono}</td> 
         <td><button class="btn btn-danger" id="boton" onclick="eliminar('${doc.id}')">Eliminar</button></td>
         <td><button class="btn btn-success" id="boton" onclick="actualizar('${doc.id}','${doc.data().nombre}','${doc.data().email}','${doc.data().direccion}','${doc.data().telefono}')">Editar</button></td>
         </tr>
         `
     });
 });

// Borrar datos
function eliminar(id) {
    db.collection("clientes").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

//Editar Documento

function actualizar(id, nombre, email, direccion, telefono) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('email').value = email;
    document.getElementById('direccion').value = direccion;
    document.getElementById('telefono').value = telefono;

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Actualizar';

    boton.onclick = function () {
        var washingtonRef = db.collection("clientes").doc(id);

        // Set the "capital" field of the city 'DC'
        var nombre = document.getElementById('nombre').value;
        var email = document.getElementById('email').value;
        var direccion = document.getElementById('direccion').value;
        var telefono = document.getElementById('telefono').value;

        return washingtonRef.update({
                nombre: nombre,
                email: email,
                direccion: direccion,
                telefono: telefono
            })
            .then(function () {
                console.log("Document successfully updated!");
                boton.innerHTML = 'Guardar';
                document.getElementById('nombre').value = '';
                document.getElementById('email').value = '';
                document.getElementById('direccion').value = '';
                document.getElementById('telefono').value = '';
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }



}