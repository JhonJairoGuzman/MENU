// Variables globales
let carrito = [];
const listaCarrito = document.querySelector('#lista-carrito');
const totalElement = document.querySelector('#total');
const contadorCarrito = document.querySelector('#contador-carrito');
const btnVaciar = document.querySelector('#vaciar-carrito');
const btnAbrirCarrito = document.querySelector('#abrir-carrito');
const btnCerrarCarrito = document.querySelector('#cerrar-carrito-modal');
const btnToggleCarrito = document.querySelector('#toggle-carrito');
const btnMenu = document.getElementById("hamburger");
const navMenu = document.querySelector(".navMenu");
let total = 0;

// Clase para los items del carrito
class ItemCarrito {
    constructor(nombre, precio, cantidad, nota) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.nota = nota;
        this.total = precio * cantidad;
    }
}

// Función para inicializar los eventos
function inicializarEventos() {
    // Agregar eventos a todos los botones "Añadir al carrito"
    document.querySelectorAll('.boton-carrito').forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    // Evento para el botón de enviar pedido
    document.querySelector('#enviar-pedido').addEventListener('click', enviarPedidoWhatsApp);

    // Evento para el botón de vaciar carrito
    btnVaciar.addEventListener('click', vaciarCarrito);

    // Evento para abrir/cerrar el carrito
    btnAbrirCarrito.addEventListener('click', abrirCarrito);
    btnCerrarCarrito.addEventListener('click', cerrarCarrito);
    btnToggleCarrito.addEventListener('click', abrirCarrito);

    // Evento para el botón de menú hamburguesa
    if (btnMenu) {
        btnMenu.addEventListener('click', toggleMenu);
    }

    // Evento para agrandar imágenes al hacer clic
    document.querySelectorAll('.producto img').forEach(img => {
        img.addEventListener('click', () => {
            img.classList.toggle('agrandar');
        });
    });

    // Inicializar la vista de plantillas
    actualizarVista();
}

// Función para abrir el carrito
function abrirCarrito() {
    document.querySelector('#carrito-container').style.display = 'block';
}

// Función para cerrar el carrito
function cerrarCarrito() {
    document.querySelector('#carrito-container').style.display = 'none';
}

// Función para mostrar/ocultar el menú de navegación
function toggleMenu() {
    navMenu.classList.toggle("active");
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    mostrarNotificacion('Carrito vaciado');
}

// Función para agregar productos al carrito
function agregarAlCarrito(e) {
    const producto = e.target.closest('.producto');
    const cantidad = parseInt(producto.querySelector('.cantidad').value);

    if (cantidad <= 0) {
        alert('Por favor seleccione una cantidad válida');
        return;
    }

    const nombre = producto.querySelector('h3').textContent;
    const precioText = producto.querySelector('.precio').textContent.replace('$', '').replace(',', '');
    const precio = parseInt(precioText);
    const nota = producto.querySelector('.nota') ? producto.querySelector('.nota').value : ''; // Captura la nota si existe

    if (isNaN(precio)) {
        alert('Precio no válido');
        return;
    }

    // Verificar si el producto ya está en el carrito
    const itemExistente = carrito.find(item => item.nombre === nombre);
    
    if (itemExistente) {
        itemExistente.cantidad += cantidad;
        itemExistente.total = itemExistente.precio * itemExistente.cantidad;
        itemExistente.nota = nota; // Actualiza la nota si el producto ya existe
    } else {
        const nuevoItem = new ItemCarrito(nombre, precio, cantidad, nota);
        carrito.push(nuevoItem);
    }

    actualizarCarrito();
    actualizarContadorCarrito();
    mostrarNotificacion('Producto agregado al carrito');
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contadorCarrito.textContent = totalItems;
    contadorCarrito.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    total =  0;

    carrito.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item-carrito');
        itemElement.innerHTML = `
            <span>${item.nombre}</span>
            <span>$${item.precio.toLocaleString()} x ${item.cantidad}</span>
            <span>$${item.total.toLocaleString()}</span>
            <span>Notas: ${item.nota || 'N/A'}</span>
            <button onclick="eliminarDelCarrito(${index})" class="btn-eliminar">X</button>
        `;
        listaCarrito.appendChild(itemElement);
        total += item.total;
    });

    totalElement.textContent = `Total: $${total.toLocaleString()}`;
    actualizarContadorCarrito();
}

// Función para eliminar items del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
    mostrarNotificacion('Producto eliminado del carrito');
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.classList.add('notificacion');
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.remove();
    }, 2000);
}

// Función para enviar pedido a WhatsApp
function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    mostrarNotificacionEnvio();

    setTimeout(() => {
        let mensaje = '🍔 *NUEVO PEDIDO* 🍟\n\n';
        mensaje += '*Detalle del pedido:*\n\n';

        carrito.forEach(item => {
            mensaje += `▪️ ${item.nombre}\n`;
            mensaje += `   Cantidad: ${item.cantidad}\n`;
            mensaje += `   Precio unitario: $${item.precio.toLocaleString()}\n`;
            mensaje += `   Subtotal: $${item.total.toLocaleString()}\n`;
            mensaje += `   Notas: ${item.nota || 'N/A'}\n\n`;
        });

        mensaje += `*TOTAL: $${total.toLocaleString()}*\n\n`;
        mensaje += '¿Podrías confirmarme la dirección de entrega?';

        const telefono = '573226155457';
        const mensajeCodificado = encodeURIComponent(mensaje);
        const urlWhatsApp = `https://wa.me/${telefono}?text=${mensajeCodificado}`;

        window.open(urlWhatsApp, '_blank');
        carrito = [];
        actualizarCarrito();
    }, 3000);
}

// Función para mostrar notificación de envío
function mostrarNotificacionEnvio() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerHTML = `
        <div class="mensaje-envio">
            <p>Espere un momento...</p>
            <p>Se está enviando su pedido</p>
            <p>¡Gracias por su compra!</p>
        </div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.remove();
    }, 3000);
}

// Inicializar eventos cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', inicializarEventos);