const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

// Fonction pour récupérer les achats d'un utilisateur
const getPurchasesSQL = (userId, res) => {
    const query = "SELECT * FROM public.\"Own\" WHERE id_user = $1"; // Requête préparée avec un paramètre
    pool.query(query, [userId])  // Utilisation de la variable userId dans le tableau de paramètres
        .then(result => {
            res.json({ purchases: result.rows });
        })
        .catch(err => {
            console.error("Erreur PostgreSQL:", err);
            res.status(500).json({ error: "Erreur de récupération des achats" });
        });
};


module.exports = {
    getPurchasesSQL,
};
