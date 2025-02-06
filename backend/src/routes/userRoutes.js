const express = require("express");
const router = express.Router();
const { getUsersSQL, getUsersNeo4j } = require("../controllers/userController");

// Route pour récupérer les utilisateurs depuis PostgreSQL
router.get("/users", (req, res) => {
  const dbType = req.query.db; // Récupère la base de données ('sql' ou 'nosql')

    if (dbType === "sql") {
        getUsersSQL(res); // Utilise le contrôleur pour PostgreSQL
    } else if (dbType === "nosql") {
        getUsersNeo4j(res); // Utilise le contrôleur pour Neo4j
    } else {
        res.status(400).send("Base de données non spécifiée");
    }
});

module.exports = router;
