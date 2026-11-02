require("dotenv").config(); // Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`
// mongoose.connect(process.env.MONGODB_URI);
// Utilisation du port défini dans le fichier .env
app.listen(process.env.PORT, () => {
  console.log("Server started");
});
const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.CLOUD_API_KEY,
  API_SECRET: process.env.CLOUD_API_SECRET,
});
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/vinted");

app.get("/", (req, res) => {
  try {
    return res.status(200).json("Bienvenue sur le serveur Vinted");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const userRoutes = require("./routes/user");
app.use(userRoutes);
const offerRoutes = require("./routes/offer");
app.use(offerRoutes);

app.all(/.*/, (req, res) => {
  return res.status(404).json("Not found");
});

app.listen(3000, () => {
  console.log("Server started");
});
