// Partículas de fondo
tsParticles.load("tsparticles", {
  fullScreen: { enable: true, zIndex: -1 },
  particles: {
    number: { value: 50 },
    color: { value: "#ff6f00" },
    shape: { type: "circle" },
    opacity: { value: 0.8, random: true },
    size: { value: 2.5, random: true },
    move: { enable: true, speed: 1, direction: "top", outModes: { default: "out" } }
  }
});

// Música de fondo
const bgMusic = new Audio("assets/Musica.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.2;
let musicEnabled = false;
const musicBtn = document.getElementById("music-btn");
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

// Sidebar
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggle-sidebar");
const closeBtn = document.getElementById("close-sidebar");
toggleBtn?.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
closeBtn?.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

// Fechas y horas
const fechaSelect = document.getElementById("fecha");
const horaSelect = document.getElementById("hora");

const generarFechas = () => {
  fechaSelect.innerHTML = '<option selected disabled>Selecciona una fecha</option>';
  const hoy = new Date();
  for (let i = 0; i < 14; i++) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + i);
    const dia = fecha.getDay();
    if (dia !== 0 && dia !== 6) {
      const fechaISO = fecha.toISOString().split("T")[0];
      const texto = fecha.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long"
      });
      const option = document.createElement("option");
      option.value = fechaISO;
      option.textContent = texto.charAt(0).toUpperCase() + texto.slice(1);
      fechaSelect.appendChild(option);
    }
  }
};

const generarHoras = () => {
  horaSelect.innerHTML = '<option selected disabled>Selecciona una hora</option>';
  for (let h = 12; h <= 17; h++) {
    ["00", "30"].forEach(min => {
      const hora = `${h.toString().padStart(2, "0")}:${min}`;
      const option = document.createElement("option");
      option.value = hora;
      option.textContent = `${hora} hs`;
      horaSelect.appendChild(option);
    });
  }
};

generarFechas();
generarHoras();

// Bloqueo de horarios reservados desde Google Sheets
let dataReservas = {};
fetch("https://script.google.com/macros/s/AKfycbyiuUoMx03gVCRggii5RDmIHsq1t0IlCA7GRMwCo-6bB59eAx3xizSxOQn1twVDqV_x/exec")
  .then(res => res.json())
  .then(data => {
    dataReservas = data;

    fechaSelect.addEventListener("change", () => {
      const fecha = fechaSelect.value;
      const horasReservadas = dataReservas[fecha] || [];

      for (const option of horaSelect.options) {
        option.disabled = false;
        if (horasReservadas.includes(option.value)) {
          option.disabled = true;
        }
      }
    });
  });

// Envío del formulario
const form = document.getElementById("reserva-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const horaSeleccionada = document.getElementById("hora").selectedOptions[0];
  if (horaSeleccionada.disabled) {
    alert("⚠️ La hora seleccionada ya está reservada. Por favor, elige otra.");
    return;
  }

  const datos = {
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    sesion: document.getElementById("sesion").value,
    fecha: document.getElementById("fecha").value,
    hora: document.getElementById("hora").value
  };

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyiuUoMx03gVCRggii5RDmIHsq1t0IlCA7GRMwCo-6bB59eAx3xizSxOQn1twVDqV_x/exec", {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();

    if (result.result === "success") {
      alert("✨ ¡Reserva enviada con éxito! Revisa tu correo para la confirmación.");
      form.reset();
    } else {
      const mensaje = result.message || "Error desconocido al enviar la reserva.";
      alert(`⚠️ Error: ${mensaje}`);
    }

  } catch (error) {
    console.error("Error al conectar con Google Sheets:", error);
    alert("Hubo un problema de conexión. Intenta nuevamente más tarde.");
  }
});
fetch("https://script.google.com/macros/s/AKfycbyiuUoMx03gVCRggii5RDmIHsq1t0IlCA7GRMwCo-6bB59eAx3xizSxOQn1twVDqV_x/exec", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(datos)
})
.then(res => res.json())
.then(result => {
  if (result.result === "success") {
    alert("¡Reserva enviada con éxito!");
    form.reset();
  } else {
    alert("⚠️ Error: " + result.message);
  }
})
.catch(err => {
  console.error("Error al conectar con Google Sheets:", err);
  alert("Hubo un problema de conexión. Intenta nuevamente más tarde.");
});
