    if (document.getElementById("tablaReservas")) {

    const BACKEND_URL = "https://proyectopersonal-kx96.onrender.com";

    async function cargarReservas() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/reservas`);
        const datos = await res.json();
        mostrarReservas(datos);
      } catch (error) {
        alert("Error al cargar reservas");
      }
    }

    function mostrarReservas(reservas) {
      const tbody = document.querySelector("#tablaReservas tbody");
      tbody.innerHTML = "";
      reservas.forEach(r => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${r.nombre}</td>
          <td>${r.email}</td>
          <td>${r.sesion}</td>
          <td>${r.fecha}</td>
          <td>${r.hora}</td>
        `;
        tbody.appendChild(fila);
      });
    }

    function aplicarFiltros() {
      const nombre = document.getElementById("filtroNombre").value.toLowerCase();
      const email = document.getElementById("filtroEmail").value.toLowerCase();
      const fecha = document.getElementById("filtroFecha").value;
      const hora = document.getElementById("filtroHora").value;
      const search = document.getElementById("buscador").value.toLowerCase();

      const filas = document.querySelectorAll("#tablaReservas tbody tr");
      filas.forEach(fila => {
        const [n, e, s, f, h] = Array.from(fila.children).map(td => td.textContent.toLowerCase());
        const visible =
          (n.includes(nombre)) &&
          (e.includes(email)) &&
          (f.includes(fecha)) &&
          (h.includes(hora)) &&
          (fila.textContent.toLowerCase().includes(search));
        fila.style.display = visible ? "" : "none";
      });
    }

    document.querySelectorAll("input").forEach(i => i.addEventListener("input", aplicarFiltros));

    cargarReservas();
}
