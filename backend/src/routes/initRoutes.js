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

router.get("/insert-massive-pgsql", (req, res) => {
    insertMassiveData(req, res);
});

router.get("/insert-massive-neo4j", (req, res) => {
    console.log('Route insert-massive-neo4j exécutée...');

});

module.exports = router;
