import express from "express";
import { getCardOfTheDay, createCard } from "../controllers/cardsController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("🪄 Ruta /api/cards funcionando");
});

router.get("/daily", getCardOfTheDay);
router.post("/", createCard);

export default router;
