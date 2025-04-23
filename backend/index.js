import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import cardRoutes from "./routes/cards.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/cards", cardRoutes);

app.get("/", (req, res) => {
  res.send("🎮 Bienvenido al backend de Pixel Tarot!");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(PORT, () => console.log(`⚡ Backend corriendo en puerto ${PORT}`));
  })
  .catch((err) => console.error("❌ Error en MongoDB:", err));
