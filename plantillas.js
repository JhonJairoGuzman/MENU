let plantillas = document.querySelectorAll('.template');
let descripcionPlantilla = document.getElementById('descripcionPlantilla');
let imagenVistaPrevia = document.getElementById('imagenVistaPrevia');
let indiceFecha = 0;

function cambiarFecha(direccion) {
    indiceFecha += direccion;
    if (indiceFecha < 0) {
        indiceFecha = 0;
    } else if (indiceFecha >= plantillas.length) {
        indiceFecha = plantillas.length - 1;
    }
    actualizarVista();
}

function actualizarVista() {
    plantillas.forEach((plantilla, index) => {
        plantilla.classList.remove('active');
        if (index === indiceFecha) {
            plantilla.classList.add('active');
            descripcionPlantilla.textContent = plantilla.querySelector('p').textContent;
            imagenVistaPrevia.src = plantilla.querySelector('.template-image').src;
        }
    });
}

// Función para usar plantilla
function usarPlantilla(plantillaId) {
    localStorage.setItem('plantillaUsada', plantillaId);
    alert(`Plantilla ${plantillaId} usada.`);
}

// Función para quitar plantilla
function quitarPlantilla(plantillaId) {
    localStorage.removeItem('plantillaUsada');
    alert(`Plantilla ${plantillaId} quitada.`);
}

// Inicializar la vista
actualizarVista();