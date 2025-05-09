const mongoose = require("mongoose");

const cartaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  imagen: String,
  tipo: String,
  energia: String,
  keywords: [String]
});

module.exports = mongoose.model("Carta", cartaSchema);
