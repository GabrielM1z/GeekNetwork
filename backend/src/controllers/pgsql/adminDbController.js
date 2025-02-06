const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// Connexion à PostgreSQL
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

// Fonction pour exécuter setup.sql
const runSetupSQL = (req, res) => {
    const filePath = path.join(__dirname, "../../script/setup.sql"); // Assurez-vous du bon chemin

    fs.readFile(filePath, "utf8", (err, sql) => {
        if (err) {
            console.error("Erreur de lecture du fichier SQL :", err);
            return res.status(500).json({ error: "Impossible de lire le fichier SQL" });
        }

        pool.query(sql)
            .then(() => res.json({ message: "Base de données initialisée avec succès" }))
            .catch(err => {
                console.error("Erreur lors de l'exécution du SQL :", err);
                res.status(500).json({ error: "Échec de l'initialisation de la base" });
            });
    });
};

module.exports = { runSetupSQL };
