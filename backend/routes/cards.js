import express from "express";
import { getCardOfTheDay, createCard } from "../controllers/cardsController.js";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("✅ Entrando a GET /api/cards");
  res.send("🪄 /api/cards está vivo");
});

router.get("/daily", (req, res, next) => {
  console.log("📥 Petición recibida en /daily");
  next();
}, getCardOfTheDay);

router.post("/", createCard);

export default router;
