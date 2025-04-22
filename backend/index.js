import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import cardRoutes from "./backend/routes/cards.js";

dotenv.config();
console.log("🧪 MONGODB_URI es:", process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/cards", cardRoutes);

app.get("/", (req, res) => {
  console.log("✅ Petición GET / recibida");
  res.send("🃏 Bienvenido al backend de Zolarium 🔮");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("🔗 Conectado a MongoDB");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✨ Zolarium backend corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error conectando a MongoDB:", error.message);
  });
