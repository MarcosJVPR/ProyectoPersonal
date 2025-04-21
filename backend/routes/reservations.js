// backend/routes/reservations.js
import express from "express";

const router = express.Router();

// Ruta temporal para probar que todo funciona
router.get("/", (req, res) => {
  res.send("✨ Ruta de reservas funcionando correctamente");
});

export default router;
