// 🎮 Carrusel dinámico con imágenes y texto
const carruselData = [
  {
    texto: "Carta diaria",
    imagen: "assets/img/fondo-carta.png" // ⬅️ Cambia por el link o ruta de tu imagen
  },
  {
    texto: "Elige",
    imagen: "assets/img/fondo-home.png" // ⬅️ Cambia por el link o ruta de tu imagen
  },
  {
    texto: "Conecta",
    imagen: "assets/img/cartas/estrella.png" // ⬅️ Cambia por el link o ruta de tu imagen
  },
  {
    texto: "Conoce",
    imagen: "assets/img/cartas/sol.png" // ⬅️ Cambia por el link o ruta de tu imagen
  }
];

const carruselContainer = document.querySelector(".carousel");
carruselContainer.innerHTML = "";

carruselData.forEach((slide, index) => {
  const div = document.createElement("div");
  div.className = "slide" + (index === 0 ? " active" : "");
  div.innerHTML = `<img src="${slide.imagen}" alt="${slide.texto}"/><p>${slide.texto}</p>`;
  carruselContainer.appendChild(div);
});

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 3000);

// 🎵 Efecto de sonido en los clics
const clickSound = new Audio("assets/sounds/click.mp3"); // ⬅️ Cambia por el link de tu sonido si quieres
clickSound.volume = 0.3;

document.querySelectorAll("a").forEach(el => {
  el.addEventListener("click", () => {
    clickSound.play();
  });
});

// 🎶 Música de fondo (desactivada por defecto)
const bgMusic = new Audio("assets/sounds/background-loop.mp3"); // ⬅️ Cambia por el link de tu música si quieres
bgMusic.loop = true;
bgMusic.volume = 0.1;


// 🎵 Botón para activar la música de fondo
const musicBtn = document.getElementById("music-btn");
let musicEnabled = false;

musicBtn.addEventListener("click", () => {
  if (!musicEnabled) {
    bgMusic.play();
    musicEnabled = true;
    musicBtn.textContent = "🔇 Detener música";
  } else {
    bgMusic.pause();
    musicEnabled = false;
    musicBtn.textContent = "🎵 Activar música";
  }
});
