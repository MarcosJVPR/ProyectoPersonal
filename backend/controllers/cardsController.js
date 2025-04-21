import Card from "../models/Card.js";

export const getCardOfTheDay = async (req, res) => {
  try {
    const cards = await Card.find();
    console.log("📦 Cartas encontradas:", cards);

    if (!cards.length) {
      return res.status(404).json({ message: "No hay cartas en la base de datos." });
    }

    const randomIndex = Math.floor(Math.random() * cards.length);
    const cardOfTheDay = cards[randomIndex];

    console.log("🔮 Carta del día:", cardOfTheDay);
    res.status(200).json(cardOfTheDay);
  } catch (error) {
    console.error("❌ Error en /api/cards/daily:", error.message);
    res.status(500).json({ message: "Error al obtener la carta del día", error: error.message });
  }
};
