const express = require("express");
const router = express.Router();
const { getPurchasesSQL } = require("../controllers/pgsql/purchaseController");
const { getPurchasesNeo4j } = require("../controllers/neo4j/purchaseController");

router.get("/purchases/:id", (req, res) => {
    const dbType = req.query.db; // Récupère la base de données ('sql' ou 'nosql')

    if (dbType === "sql") {
        // Appel du contrôleur pour PostgreSQL, avec le userId passé en paramètre
        getPurchasesSQL(req.params.id, res);
    } else if (dbType === "nosql") {
        // Appel du contrôleur pour Neo4j, avec le userId passé en paramètre
        getPurchasesNeo4j(req.params.id, res);
    } else {
        res.status(400).send("Base de données non spécifiée");
    }
});

module.exports = router;
