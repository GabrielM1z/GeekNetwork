const express = require("express");
const cors = require("cors");
const { getUsersSQL } = require("./controllers/userController");
const { getUsersNeo4j } = require("./controllers/userController");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

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
