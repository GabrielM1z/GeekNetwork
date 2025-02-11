const express = require("express");
const router = express.Router();
const { getTopElementsSQL } = require("../controllers/pgsql/topElementsController");
const { getTopElementsNeo4j } = require("../controllers/neo4j/topElementsController");

router.post("/top-elements", (req, res) => {
    const { table, limit, dbType } = req.body; // Récupère les données du corps de la requête
    // Vérifie la base de données et appelle la fonction correspondante
    if (dbType === "pgsql") {
        getTopElementsSQL(table, limit, res);  // Appelle la fonction pour SQL
    } else if (dbType === "neo4j") {
        getTopElementsNeo4j(table, limit, res);  // Appelle la fonction pour Neo4j
    } else {
        res.status(400).send("Base de données non spécifiée");
    }
});

module.exports = router;
