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



// Route d'insertion massive
const insertMassiveData = async (req, res) => {
    try {
        // Commencer une transaction
        await pool.query("BEGIN");

        // 1. Insérer 1 million d'utilisateurs
        for (let i = 0; i < 1000000; i++) {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            await pool.query(
                'INSERT INTO "User" (firstname, lastname) VALUES ($1, $2)',
                [firstName, lastName]
            );
        }

        // 2. Insérer des relations de followers (0-20 followers par utilisateur)
        for (let userId = 1; userId <= 1000000; userId++) {
            const numberOfFollowers = Math.floor(Math.random() * 21); // 0-20 followers
            for (let j = 0; j < numberOfFollowers; j++) {
                const followerId = Math.floor(Math.random() * 1000000) + 1;
                if (followerId !== userId) {
                    await pool.query(
                        'INSERT INTO "Follow" (id_user, id_follower) VALUES ($1, $2)',
                        [userId, followerId]
                    );
                }
            }
        }

        // 3. Insérer 10 000 produits
        for (let i = 0; i < 10000; i++) {
            const productName = faker.commerce.productName();
            const productPrice = parseFloat(faker.commerce.price());
            await pool.query(
                'INSERT INTO "Product" (name, price) VALUES ($1, $2)',
                [productName, productPrice]
            );
        }

        // 4. Insérer des relations de possession de produits (0-5 produits par utilisateur)
        for (let userId = 1; userId <= 1000000; userId++) {
            const numberOfProducts = Math.floor(Math.random() * 6); // 0-5 produits
            for (let j = 0; j < numberOfProducts; j++) {
                const productId = Math.floor(Math.random() * 10000) + 1; // 10 000 produits
                await pool.query(
                    'INSERT INTO "Own" (id_user, id_product) VALUES ($1, $2)',
                    [userId, productId]
                );
            }
        }

        // Commit la transaction
        await pool.query("COMMIT");

        // Réponse réussie
        res.json({ message: "Données insérées avec succès dans PostgreSQL" });
    } catch (error) {
        // Rollback si erreur
        await pool.query("ROLLBACK");
        console.error("Erreur lors de l'insertion des données :", error);
        res.status(500).json({ error: "Erreur lors de l'insertion des données" });
    }
};




module.exports = { runSetupSQL, insertMassiveData };
