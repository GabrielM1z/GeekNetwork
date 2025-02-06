const express = require("express");
const cors = require("cors");
const path = require("path");
const { getUsersSQL, getUsersNeo4j } = require("./controllers/userController");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve les fichiers statiques (front-end) depuis le dossier 'public'
app.use(express.static(path.join(__dirname, "public")));

// Route pour obtenir les utilisateurs
app.get("/api/users", (req, res) => {
  const dbType = req.query.db; // 'sql' ou 'nosql'

    if (dbType === "sql") {
        getUsersSQL(res);
    } else if (dbType === "nosql") {
        getUsersNeo4j(res);
    } else {
        res.status(400).send("Base de données non spécifiée");
    }
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
