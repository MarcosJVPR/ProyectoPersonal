import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  meaning: { type: String, required: true },
  image: { type: String, required: true }
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
