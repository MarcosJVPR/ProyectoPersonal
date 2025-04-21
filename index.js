import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import cardRoutes from "./backend/routes/cards.js";
import reservationRoutes from "./backend/routes/reservations.js";
import authRoutes from "./backend/routes/auth.js";

dotenv.config();
console.log("🧪 MONGODB_URI es:", process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/cards", cardRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
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
