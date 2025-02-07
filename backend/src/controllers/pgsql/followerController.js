const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

// Fonction pour récupérer les produits achetés par les followers d'un utilisateur à plusieurs niveaux
const getFollowersProductsSQL = (userId, depth, res) => {
    const query = `
        WITH RECURSIVE followers_tree AS (
            SELECT id_follower, id_user, 1 AS level
            FROM "Follow"
            WHERE id_user = $1
            UNION ALL
            SELECT f.id_follower, f.id_user, ft.level + 1
            FROM "Follow" f
            INNER JOIN followers_tree ft ON f.id_user = ft.id_follower
            WHERE ft.level < $2
        )
        SELECT p.id AS product_id, p.name AS product_name, COUNT(*) AS purchase_count
        FROM followers_tree ft
        JOIN "Own" o ON ft.id_follower = o.id_user
        JOIN "Product" p ON o.id_product = p.id
        GROUP BY p.id, p.name
        ORDER BY purchase_count DESC;
    `;

    pool.query(query, [userId, depth])  // Utilisation des paramètres userId et depth
        .then(result => {
            res.json({ products: result.rows });
        })
        .catch(err => {
            console.error("Erreur PostgreSQL:", err);
            res.status(500).json({ error: "Erreur de récupération des produits achetés par les followers" });
        });
};

module.exports = {
    getFollowersProductsSQL,
};
