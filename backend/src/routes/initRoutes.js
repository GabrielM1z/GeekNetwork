const express = require("express");
const router = express.Router();
const { getUsersSQL, getUsersNeo4j } = require("../controllers/userController");

router.get("/init-pgsql", (req, res) => {
    getUsersSQL(res);
});

router.get("/init-neo4j", (req, res) => {
    getUsersSQL(res);
});

module.exports = router;
