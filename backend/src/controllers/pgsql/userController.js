const { Pool } = require("pg"); // Importation de la librairie PostgreSQL

// Connexion à PostgreSQL
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

// Fonction pour récupérer les utilisateurs depuis PostgreSQL
const getUsersSQL = (res) => {
    const query = "SELECT * FROM public.\"User\" LIMIT 10"; // Exemple de requête PostgreSQL

    pool.query(query)
        .then(result => {
            res.json({ users: result.rows }); // Renvoie les utilisateurs récupérés
        })
        .catch(err => {
            console.error("Erreur PostgreSQL:", err);
            res.status(500).json({ error: "Erreur de récupération des utilisateurs" });
        });
};

module.exports = {
    getUsersSQL,
};
