let currentSlide = 0;
const slides = document.querySelectorAll('.scene');
let isScrolling = false;

// Inicializa posición
function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;

  isScrolling = true;
  currentSlide = index;

  slides.forEach((slide, i) => {
    slide.style.transform = `translateY(${(i - currentSlide) * 100}vh)`;
  });

  // Espera para permitir nueva transición
  setTimeout(() => {
    isScrolling = false;
  }, 800); // Debe coincidir con transition-duration del CSS
}

// Detecta scroll del mouse
window.addEventListener('wheel', (e) => {
  if (isScrolling) return;

  if (e.deltaY > 0 && currentSlide < slides.length - 1) {
    goToSlide(currentSlide + 1);
  } else if (e.deltaY < 0 && currentSlide > 0) {
    goToSlide(currentSlide - 1);
  }
});

// Teclas de navegación
window.addEventListener('keydown', (e) => {
  if (isScrolling) return;

  if (e.key === 'ArrowDown' && currentSlide < slides.length - 1) {
    goToSlide(currentSlide + 1);
  } else if (e.key === 'ArrowUp' && currentSlide > 0) {
    goToSlide(currentSlide - 1);
  }
});

// Al cargar, fija posición inicial
window.addEventListener('DOMContentLoaded', () => {
  slides.forEach((slide, i) => {
    slide.style.transition = 'transform 0.8s ease-in-out';
    slide.style.transform = `translateY(${i * 100}vh)`;
  });
});
