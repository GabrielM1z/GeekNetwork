const express = require("express");
const router = express.Router();
const { runSetupNoSQL } = require("../controllers/neo4j/adminDbController");
const { runSetupSQL } = require("../controllers/pgsql/adminDbController");

router.get("/init-pgsql", (req, res) => {
    runSetupSQL(req, res);
});

router.get("/init-neo4j", (req, res) => {
    runSetupNoSQL(req, res);
});

module.exports = router;
