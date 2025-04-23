import Card from "../models/Card.js";

export const getCardOfTheDay = async (req, res) => {
  try {
    const cards = await Card.find();
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    res.status(200).json(randomCard);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener carta", error: err.message });
  }
};

export const createCard = async (req, res) => {
  try {
    const newCard = new Card(req.body);
    await newCard.save();
    res.status(201).json({ message: "Carta creada", card: newCard });
  } catch (err) {
    res.status(500).json({ message: "Error al crear carta", error: err.message });
  }
};
