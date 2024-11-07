document.addEventListener('DOMContentLoaded', function() {
    // Número de WhatsApp
    const whatsappNumber = '573226155457';

    // Función para mostrar alerta personalizada con SweetAlert2
    function showCustomAlert(itemType, total) {
        Swal.fire({
            title: '¡Preparando tu pedido! 🎄',
            html: `
                <div style="margin: 20px 0;">
                    <p>Tu ${itemType} se está procesando.</p>
                    <p style="margin-top: 10px;">Valor total: $${total.toLocaleString('es-CO')}</p>
                    <p style="margin-top: 10px;">¡The Renacer te desea una Feliz Navidad! ✨</p>
                </div>
            `,
            icon: 'success',
            confirmButtonText: '¡Gracias!',
            customClass: {
                popup: 'custom-alert',
                confirmButton: 'custom-confirm-button'
            },
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            timer: 3000,
            timerProgressBar: true,
            background: '#fff3f3',
            backdrop: `
                rgba(33,33,33,0.4)
                url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.spinner_P7sC%7Banimation:spinner_svv2 .8s linear infinite;animation-delay:-.8s%7D.spinner_MJg4%7Banimation-delay:-.65s%7D@keyframes spinner_svv2%7B92%25%7Btransform:rotate(360deg)%7D%7D%3C/style%3E%3Cpath d='M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z' opacity='.25'/%3E%3Cpath d='M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z' class='spinner_P7sC'/%3E%3C/svg%3E")
                center/80px no-repeat
            `
        });
    }

    // Función para formatear el pedido
    function formatOrder(container, itemType) {
        const title = container.querySelector('h3').textContent;
        const items = Array.from(container.querySelectorAll('ul li'))
            .filter(li => !li.textContent.toLowerCase().includes('precio'))
            .map(li => li.textContent.trim());
        
        let precioText = '';
        let total = 0;

        // Buscar el precio en diferentes lugares según el tipo de contenedor
        if (container.classList.contains('evento')) {
            const precioElement = container.querySelector('.precio');
            precioText = precioElement ? precioElement.textContent.trim() : '';
        } else {
            const precioElement = container.querySelector('li:last-child');
            precioText = precioElement ? precioElement.textContent.trim() : '';
        }

        // Extraer el valor numérico del precio
        const precioMatch = precioText.match(/\$\s*([\d,.]+)/);
        if (precioMatch) {
            total = parseFloat(precioMatch[1].replace(/\./g, '').replace(',', '.'));
        }

        return {
            title: title,
            items: items,
            precio: precioText,
            total: total
        };
    }

    // Función para enviar mensaje a WhatsApp
    function sendToWhatsApp(itemType, container) {
        const order = formatOrder(container, itemType);
        
        let message = `¡Hola! 👋 Me gustaría ordenar el siguiente ${itemType}:\n\n`;
        message += `*${order.title}* 🎄\n\n`;
        message += `*Incluye:*\n${order.items.map(item => `• ${item}`).join('\n')}\n\n`;
        message += `*${order.precio}* 💰\n\n`;
        message += `*Valor total: $${order.total.toLocaleString('es-CO')}*\n\n`;
        message += `¡Gracias! ✨`;

        showCustomAlert(itemType, order.total);
        
        // Retraso antes de abrir WhatsApp
        setTimeout(() => {
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        }, 2000);
    }

    // Event listeners para botones de combos
    document.querySelectorAll('.button.reserva').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const container = this.closest('.evento, .menu-item');
            sendToWhatsApp('combo', container);
        });
    });

    // Event listeners para botones de promociones
    document.querySelectorAll('.promocion .button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const container = this.closest('.promocion');
            sendToWhatsApp('promoción', container);
        });
    });

    // Animación de copos de nieve
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = ['❅', '❆', '❄'][Math.floor(Math.random() * 3)];
        snowflake.style.left = Math.random() * window.innerWidth + 'px';
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
        
        document.body.appendChild(snowflake);
        
        // Eliminar el copo de nieve después de la animación
        setTimeout(() => {
            snowflake.remove();
        }, 5000);
    }

    // Crear copos de nieve periódicamente
    setInterval(createSnowflake, 300);

    // Manejar errores
    window.onerror = function(msg, url, lineNo, columnNo, error) {
        console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
        return false;
    };

    // Añadir estilos CSS para los copos de nieve
    const snowflakeStyles = document.createElement('style');
    snowflakeStyles.textContent = `
        .snowflake {
            position: fixed;
            top: -10px;
            color: #fff;
            text-shadow:  0 0 5px rgba(255, 255, 255, 0.8);
            pointer-events: none;
            z-index: 9999;
            animation: fall linear infinite;
        }
        
        @keyframes fall {
            to {
                transform: translateY(100vh);
            }
        }
    `;
    document.head.appendChild(snowflakeStyles);
});