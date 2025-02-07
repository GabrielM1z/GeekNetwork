const express = require("express");
const router = express.Router();
const { getFollowersProductsSQL } = require("../controllers/pgsql/followerController");
const { getFollowersProductsNeo4j } = require("../controllers/neo4j/followerController");

router.get("/followers/:id/:depth", (req, res) => {
    const dbType = req.query.db; // Récupère la base de données ('sql' ou 'nosql')
    const id = req.params.id;
    const depth = req.params.depth;

    if (dbType === "sql") {
        getFollowersProductsSQL(id, depth, res);
    } else if (dbType === "nosql") {
        getFollowersProductsNeo4j(id, depth, res);
    } else {
        res.status(400).send("Base de données non spécifiée");
    }
});

module.exports = router;
