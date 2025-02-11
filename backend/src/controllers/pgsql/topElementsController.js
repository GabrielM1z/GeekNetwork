const { Pool } = require("pg");
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

const getTopElementsSQL = (table, limit, res) => {
    let query = '';
    let values = [];
    switch (table) {
        case 'User':
            query = 'SELECT id, firstname, lastname FROM "User" LIMIT $1';
            values = [limit];
            break;
        case 'Product':
            query = 'SELECT id, name, price FROM "Product" LIMIT $1';
            values = [limit];
            break;
        case 'Own':
            query = `
                SELECT o.id, u.firstname, u.lastname, p.name, o.id_user, o.id_product 
                FROM "Own" o
                JOIN "User" u ON o.id_user = u.id
                JOIN "Product" p ON o.id_product = p.id
                LIMIT $1
            `;
            values = [limit];
            break;
        case 'Follow':
            query = `
                SELECT u.firstname, u.lastname, f.id_follower
                FROM "Follow" f
                JOIN "User" u ON f.id_user = u.id
                LIMIT $1
            `;

            values = [limit];
            break;
        default:
            return res.status(400).send("Table non valide");
    }

    const startTime = performance.now();
    pool.query(query, values)
        .then(result => {
            const endTime = performance.now();
            const executionTime = (endTime - startTime).toFixed(2);
            res.json({
                response: "Requête n°0 SQL exécutée avec succès.",
                response_time: executionTime,
                data: result.rows
            });
        })
        .catch(err => {
            console.error("Erreur PostgreSQL:", err);
            res.status(500).json({
                error: "Erreur de récupération des éléments",
                response_time: 0,
            });
        });
};

module.exports = {
    getTopElementsSQL,
};
