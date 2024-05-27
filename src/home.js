import { getAtracciones } from "./firebase-config.js";

let atracciones = [];

// Función para llenar el select
function fillAtracciones(options) {
    const selectElement = document.getElementById('atracciones');

    // Recorrer el arreglo y crear las opciones
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.id;
        optionElement.textContent = option.nombre;
        selectElement.appendChild(optionElement);
    });
}

// Acción a ejecutar cuando se selecciona una opción
function onSelectChange(event) {
    const selectedValue = event.target.value;
    fillEstado(selectedValue);
}

function fillEstado(selectedValue) {
    const estadoElement = document.getElementById('estado');

    // Obtener el estado de la atracción seleccionada
    const atraccion = atracciones.find(atraccion => atraccion.id == selectedValue);
    estadoElement.value = atraccion.estado;
}

// Llamar a la función asíncrona para obtener los datos y llenar el select
async function init() {
    try {
        atracciones = await getAtracciones();
        console.log(atracciones);
        fillAtracciones(atracciones);

         // Añadir el event listener después de llenar el select
        const selectElement = document.getElementById('atracciones');
        selectElement.addEventListener('change', onSelectChange);
    } catch (error) {
        console.error("Error al obtener las atracciones:", error);
    }
}

document.addEventListener('DOMContentLoaded', init);