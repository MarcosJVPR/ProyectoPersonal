const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  sesion: String,
  fecha: String,
  hora: String
});

module.exports = mongoose.model("Reserva", reservaSchema);
