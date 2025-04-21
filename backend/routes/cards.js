import express from "express";
import { getCardOfTheDay, createCard } from "../controllers/cardsController.js";

const router = express.Router();

// Ruta de prueba para saber si funciona
router.get("/", (req, res) => {
  res.send("🪄 Ruta /api/cards funcionando");
});

router.get("/daily", (req, res, next) => {
  console.log("📥 Petición recibida en /daily");
  next();
}, getCardOfTheDay);
router.post("/", createCard);

export default router;
