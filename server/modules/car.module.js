const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  imageURL: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date },
});
const Car = mongoose.model("Car", carSchema);
module.exports = Car;
