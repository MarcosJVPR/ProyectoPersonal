import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import cardRoutes from "./routes/cards.js";
import reservationRoutes from "./routes/reservations.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/cards", cardRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/auth", authRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("🃏 Bienvenido al backend de Zolarium 🔮");
});

// DB Connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("🔗 Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`✨ Zolarium backend corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error conectando a MongoDB:", error);
  });

