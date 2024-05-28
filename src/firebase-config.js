// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getDatabase, ref, set, child, get, push, update } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMyJrrpByYvxkctJy1iOvAvtxiAEEky6A",
  authDomain: "waitless-5a296.firebaseapp.com",
  databaseURL: "https://waitless-5a296-default-rtdb.firebaseio.com",
  projectId: "waitless-5a296",
  storageBucket: "waitless-5a296.appspot.com",
  messagingSenderId: "219497812177",
  appId: "1:219497812177:web:46d1fc5e86a5fc2a5fb5f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);

export function writeUserData(userId, name) {
  set(ref(database, 'prueba/' + userId), {
    username: name
  });
}

export async function getAtracciones() {
  const dbRef = ref(database);
  let atracciones = [];
  await get(child(dbRef, `atracciones`)).then((snapshot) => {
    if (snapshot.exists()) {
      for( var i in snapshot.val() ) {
        atracciones.push({
          id: snapshot.val()[i].aId,
          nombre: snapshot.val()[i].aNombre,
          estado: snapshot.val()[i].estado,
          parque: snapshot.val()[i].parque
        });
      }
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  return atracciones;
}

export function actualizarEstado(id, nombre, estado, parque) {

  // A post entry.
  const estadoActualizado = {
    aId: id,
    aNombre: nombre,
    estado: estado,
    parque: parque
  };

  const updates = {};
  updates['/atracciones/' + id] = estadoActualizado;

  return update(ref(database), updates);
}