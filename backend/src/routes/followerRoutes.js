const express = require("express");
const router = express.Router();
const { getFollowersProductsSQL } = require("../controllers/pgsql/followerController");
const { getFollowersProductsNeo4j } = require("../controllers/neo4j/followerController");
const { getFollowersProductsForSpecificProductSQL } = require("../controllers/pgsql/followersProductController");
const { getFollowersProductsForSpecificProductNeo4j } = require("../controllers/neo4j/followersProductController");

router.post("/followers/products", (req, res) => {
    const { userId, depth, dbType, productId } = req.body; // Récupère les données du corps de la requête

    // Vérifie si un productId est présent
    if (productId) {
        if (dbType === "pgsql") {
            getFollowersProductsForSpecificProductSQL(userId, depth, productId, res);  // Appelle la fonction pour SQL
        } else if (dbType === "neo4j") {
            getFollowersProductsForSpecificProductNeo4j(userId, depth, productId, res);  // Appelle la fonction pour Neo4j
        } else {
            res.status(400).send("Base de données non spécifiée");
        }
    } else {
        // Si aucun productId n'est présent, appelle les fonctions classiques
        if (dbType === "pgsql") {
            getFollowersProductsSQL(userId, depth, res);
        } else if (dbType === "neo4j") {
            getFollowersProductsNeo4j(userId, depth, res);
        } else {
            res.status(400).send("Base de données non spécifiée");
        }
    }
});

module.exports = router;

