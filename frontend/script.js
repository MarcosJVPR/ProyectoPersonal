async function getCard() {
    try {
      const res = await fetch("https://jubilant-space-carnival-5v5qxppxg52945-5000.app.github.dev/api/cards/daily");
      const data = await res.json();
  
      document.getElementById("cardImage").src = data.image;
      document.getElementById("cardName").textContent = data.name;
      document.getElementById("cardMeaning").textContent = data.meaning;
      document.getElementById("card").classList.remove("hidden");
    } catch (err) {
      alert("Error al conectar con los astros. Intenta de nuevo.");
      console.error(err);
    }
  }
  
  tsParticles.load("particles", {
    particles: {
      number: { value: 30 },
      size: { value: 3 },
      move: { speed: 0.5 },
      color: { value: "#ffffff" },
      opacity: { value: 0.3 },
      line_linked: {
        enable: true,
        distance: 100,
        opacity: 0.1
      }
    },
    interactivity: {
      events: {
        onhover: { enable: false },
        onclick: { enable: false }
      }
    },
    background: {
      color: "#000"
    }
  });
  