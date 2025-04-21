import Card from "../models/Card.js";

export const createCard = async (req, res) => {
  const { name, meaning, image } = req.body;
  console.log("🧾 Recibido:", req.body);

  try {
    const newCard = new Card({ name, meaning, image });
    await newCard.save();
    res.status(201).json({ message: "Carta creada", card: newCard });
  } catch (error) {
    console.error("❌ Error creando carta:", error.message);
    res.status(500).json({ message: "Error al crear la carta", error: error.message });
  }
};

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
    res.status(500).json({ message: "Error al obtener la carta del día", error: error.message });
  }
};
