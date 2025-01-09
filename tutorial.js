const images = [
   'img/imagen1.jpeg',
    'img/imagen2.jpeg',
    'img/imagen3.jpeg',
    'img/imagen4.jpeg',
    'img/imagen5.jpeg',
  
];

let currentIndex = 0;

const tutorialImage = document.getElementById('tutorial-image');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

function updateImage() {
    tutorialImage.style.transform = 'scale(0)'; // Efecto de reducción
    setTimeout(() => {
        tutorialImage.src = images[currentIndex];
        tutorialImage.style.transform = 'scale(1)'; // Efecto de aumento
    }, 300); // Tiempo de espera para la animación
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    updateImage();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    updateImage();
});

// Inicializar la imagen
updateImage();