const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Modelo de reservas
const Reserva = require("./models/reserva");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// Ruta principal (para servir index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// Ruta para guardar reservas
app.post("/api/reservas", async (req, res) => {
  try {
    const nuevaReserva = new Reserva(req.body);
    await nuevaReserva.save();
    res.json({ result: "success" });
  } catch (err) {
    console.error("Error al guardar reserva:", err);
    res.status(500).json({ result: "error", message: "Error al guardar reserva" });
  }
});

// Ruta para consultar horarios reservados por fecha
app.get("/api/reservas", async (req, res) => {
  const fecha = req.query.fecha;
  try {
    const reservas = await Reserva.find({ fecha });
    const horas = reservas.map(r => r.hora);
    res.json({ [fecha]: horas });
  } catch (err) {
    console.error("Error al obtener reservas:", err);
    res.status(500).json({ error: "Error al obtener reservas" });
  }
});

// Conexión a MongoDB y arranque del servidor
console.log("Conectando a MongoDB con:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error conectando a MongoDB:", err);
  });
