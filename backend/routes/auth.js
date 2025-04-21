// backend/routes/auth.js
import express from "express";

const router = express.Router();

// Ruta temporal
router.get("/", (req, res) => {
  res.send("🔐 Ruta de autenticación funcionando correctamente");
});

export default router;
