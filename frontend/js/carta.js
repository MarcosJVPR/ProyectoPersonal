document.addEventListener("DOMContentLoaded", () => {
  const cartaContainer = document.getElementById("carta-dia");

  fetch("https://jubilant-space-carnival-5v5qxppxg52945-5000.app.github.dev/api/cards/daily")
    .then((res) => res.json())
    .then((data) => {
      cartaContainer.innerHTML = `
        <div class="card carta text-light text-center p-4">
          <img src="${data.image}" class="card-img-top pixel-img mx-auto" alt="${data.name}">
          <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">${data.meaning}</p>
          </div>
        </div>
      `;
    })
    .catch((err) => {
      cartaContainer.innerHTML = `<p class="text-danger">Error al conectar con los astros. Intenta de nuevo.</p>`;
    });
});
