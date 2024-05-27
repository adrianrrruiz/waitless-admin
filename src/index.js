import { writeUserData } from "./firebase-config.js";

console.log("Escribiendo con la funcion write data")


//writeUserData("123","adrian")

document.getElementById('login').addEventListener('click', function() {
    // Aquí puedes añadir validaciones si es necesario
    window.location.href = './home.html';
});