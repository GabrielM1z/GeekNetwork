const express = require("express");
const router = express.Router();
const { runSetupNoSQL, insertMassiveUserNoSQL, insertMassiveProductNoSQL, insertMassiveFollowerNoSQL, insertMassiveOwnNoSQL } = require("../controllers/neo4j/adminDbController");
const { runSetupSQL, insertMassiveUserSQL, insertMassiveProductSQL, insertMassiveFollowerSQL, insertMassiveOwnSQL, insertMassiveSQL } = require("../controllers/pgsql/adminDbController");

router.get("/init-pgsql", (req, res) => {
    runSetupSQL(req, res);
});

router.get("/init-neo4j", (req, res) => {
    runSetupNoSQL(req, res);
});

// insérer des données massives
router.post("/insert-massive-pgsql", (req, res) => {
    insertMassiveSQL(req, res);
});

router.post("/insert-massive-neo4j", (req, res) => {
    insertMassiveUserNoSQL(req, res);
    insertMassiveProductNoSQL(req, res);
    insertMassiveFollowerNoSQL(req, res);
    insertMassiveOwnNoSQL(req, res);
});

// insérer des utilisateurs
router.post("/insert-user-pgsql", (req, res) => {
    insertMassiveUserSQL(req, res);
});

router.post("/insert-user-neo4j", (req, res) => {
    insertMassiveUserNoSQL(req, res);
});

// inserer des produits
router.post("/insert-product-pgsql", (req, res) => {
    insertMassiveProductSQL(req, res);
});

router.post("/insert-product-neo4j", (req, res) => {
    insertMassiveProductNoSQL(req, res);
});

// insérer des followers
router.get("/insert-follower-pgsql", (req, res) => {
    insertMassiveFollowerSQL(req, res);
});

router.get("/insert-follower-neo4j", (req, res) => {
    insertMassiveFollowerNoSQL(req, res);
});

// insérer des propriétaires
router.get("/insert-own-pgsql", (req, res) => {
    insertMassiveOwnSQL(req, res);
});

router.get("/insert-own-neo4j", (req, res) => {
    insertMassiveOwnNoSQL(req, res);
});

module.exports = router;
