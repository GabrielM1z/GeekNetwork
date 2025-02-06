const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Importation des routes
const userRoutes = require("./routes/userRoutes");
const initRoutes = require("./routes/initRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Serve les fichiers statiques (front-end) depuis le dossier 'public'
app.use(express.static(path.join(__dirname, "public")));

// Utilisation des routes pour les utilisateurs
app.use("/api", userRoutes);
app.use("/api", initRoutes);
app.use("/api", purchaseRoutes);

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
