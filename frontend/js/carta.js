async function getCard() {
    const apiUrl = "https://tu-api-en-render.com/api/cards/daily"; // cámbialo por tu URL real
  
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("No se pudo obtener la carta");
  
      const data = await res.json();
      document.getElementById("cardImage").src = data.image;
      document.getElementById("cardName").textContent = data.name;
      document.getElementById("cardMeaning").textContent = data.meaning;
      document.getElementById("card").classList.remove("hidden");
    } catch (err) {
      alert("🌒 Error al conectar con los astros. Intenta de nuevo.");
      console.error(err);
    }
  }
  