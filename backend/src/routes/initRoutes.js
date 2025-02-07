const express = require("express");
const router = express.Router();
const { runSetupNoSQL } = require("../controllers/neo4j/adminDbController");
const { runSetupSQL, insertMassiveData } = require("../controllers/pgsql/adminDbController");

router.get("/init-pgsql", (req, res) => {
    runSetupSQL(req, res);
});

router.get("/init-neo4j", (req, res) => {
    runSetupNoSQL(req, res);
});

// insérer des données massives
router.post("/insert-massive-pgsql", (req, res) => {
    insertMassiveData(req, res);
});

router.post("/insert-massive-neo4j", (req, res) => {
    console.log('Route insert-massive-neo4j exécutée...');

});

// insérer des utilisateurs
router.post("/insert-user-pgsql", (req, res) => {
    insertUser(req, res);
});

router.post("/insert-user-neo4j", (req, res) => {
    console.log('Route insert-user-neo4j exécutée...');
});

// inserer des produits
router.post("/insert-product-pgsql", (req, res) => {
    insertProduct(req, res);
});

router.post("/insert-product-neo4j", (req, res) => {
    console.log('Route insert-product-neo4j exécutée...');
});

// insérer des followers
router.post("/insert-follower-pgsql", (req, res) => {
    insertFollower(req, res);
});

router.post("/insert-follower-neo4j", (req, res) => {
    console.log('Route insert-follower-neo4j exécutée...');
});

// insérer des propriétaires
router.post("/insert-own-pgsql", (req, res) => {
    insertOwn(req, res);
});

router.post("/insert-own-neo4j", (req, res) => {
    console.log('Route insert-own-neo4j exécutée...');
});

module.exports = router;
