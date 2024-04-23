import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import mongoose from "mongoose";
import routes from './src/routes/indexRoutes';

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
app.use(express.json());

// Remplacez 'your_mongodb_uri' par votre URI de connexion MongoDB
mongoose
  .connect(
    "mongodb+srv://atdf2002:Bouboule2323@cluster0.rquz93z.mongodb.net/trello?retryWrites=true&w=majority",
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err: Error) => {
    // Ajoutez le type Error pour le paramètre err
    console.error("Could not connect to MongoDB...", err);
  });

const port = process.env.PORT || 3000; // Assurez-vous d'avoir un fichier .env avec la variable PORT

app.use(
  cors({
    origin: "*", // Permet à toutes les origines d'accéder à votre serveur
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("HELLO WORLD");
});

app.use('/api/users', routes.userRoutes);

app.use((req, res) => {
  res.status(404).send("404 NOT FOUND");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});