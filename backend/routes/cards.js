import express from "express";
import { getCardOfTheDay, createCard } from "../controllers/cardsController.js";

const router = express.Router();

router.get("/daily", getCardOfTheDay);
router.post("/", createCard);

export default router;
