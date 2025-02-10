const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const faker = require('@faker-js/faker'); // Générateur de données fictives
const { error } = require("console");


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

        const startTime = performance.now(); // 🔹 Début du timer
        pool.query(sql)
            .then(() => {
                const endTime = performance.now(); // 🔹 Fin du timer
                const executionTime = (endTime - startTime).toFixed(2); // 🔹 Calcul du temps écoulé
                res.json({
                    response: "Base de données initialisée avec succès",
                    response_time: executionTime
                })
            })
            .catch(err => {
                console.error("Erreur lors de l'exécution du SQL :", err);
                res.status(500).json({
                    response: "Échec de l'initialisation de la base",
                    response_time: 0,
                });
            });
    });
};


//////////////////////////////////
// Insérer des données massives //
//////////////////////////////////

const insertMassiveSQL = async (req, res) => {
    try {
        const { nbUser, nbProduct } = req.body;
        console.log("Début de l'insertion massives générales...");

        const startTime = performance.now();
        await pool.query("BEGIN");
        await insertUser(nbUser);
        await pool.query("COMMIT");
        await pool.query("BEGIN");
        await insertProduct(nbProduct);
        await pool.query("COMMIT");
        await pool.query("BEGIN");
        await insertFollower();
        await pool.query("COMMIT");
        await pool.query("BEGIN");
        await insertOwn();
        await pool.query("COMMIT");
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);

        console.log("Insertion massive générale terminée !");
        return res.json({
            response: "Données insérées avec succès dans PostgreSQL",
            response_time: executionTime
        });
    } catch (error) {
        // Rollback si erreur
        await pool.query("ROLLBACK");
        console.error("Erreur lors de l'insertion massive générale :", error);
        return res.status(500).json({
            response: "Erreur lors de l'insertion massive générale",
            response_time: 0
        });
    }
}

const insertMassiveUserSQL = async (req, res) => {
    try {
        const { nbUser } = req.body;
        console.log("Début de l'insertion des utilisateurs...");

        const startTime = performance.now();
        await pool.query("BEGIN");
        await insertUser(nbUser);
        await pool.query("COMMIT");
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);

        console.log("Insertion des utilisateurs terminée !");
        return res.json({
            response: "Utilisateurs insérés avec succès dans PostgreSQL",
            response_time: executionTime
        });

    } catch (error) {
        // Rollback si erreur
        await pool.query("ROLLBACK");
        console.error("Erreur lors de l'insertion des utilisateurs :", error);
        return res.status(500).json({
            response: "Erreur lors de l'insertion des utilisateurs",
            response_time: 0
        });
    }
};

const insertMassiveProductSQL = async (req, res) => {
    try {
        const { nbProduct } = req.body;
        console.log("Début de l'insertion des produits...");

        const startTime = performance.now();
        await pool.query("BEGIN");
        await insertProduct(nbProduct);
        await pool.query("COMMIT");
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);

        console.log("Insertion des produits terminée !");
        return res.json({
            response: "Produits insérés avec succès dans PostgreSQL",
            response_time: executionTime
        });

    } catch (error) {
        // Rollback si erreur
        await pool.query("ROLLBACK");
        console.error("Erreur lors de l'insertion des produits :", error);
        return res.status(500).json({
            error: "Erreur lors de l'insertion des produits"
        });
    }
};

const insertMassiveFollowerSQL = async (req, res) => {
    try {
        console.log("Début de l'insertion des followers...");

        const startTime = performance.now();
        await pool.query("BEGIN");
        await insertFollower();
        await pool.query("COMMIT");
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);

        console.log("Insertion des followers terminée !");
        return res.json({
            response: "Followers insérés avec succès dans PostgreSQL",
            response_time: executionTime
        });

    } catch (error) {
        // Rollback si erreur
        await pool.query("ROLLBACK");
        console.error("Erreur lors de l'insertion des followers :", error);
        return res.status(500).json({
            response: "Erreur lors de l'insertion des followers",
            response_time: 0
        });
    }
};

const insertMassiveOwnSQL = async (req, res) => {
    try {
        console.log("Début de l'insertion des achats...");

        const startTime = performance.now();
        await pool.query("BEGIN");
        await insertOwn();
        await pool.query("COMMIT");
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);

        console.log("Insertion des achats terminée !");
        return res.json({
            response: "Achats insérés avec succès dans PostgreSQL",
            response_time: executionTime
        });

    } catch (error) {
        // Rollback si erreur
        await pool.query("ROLLBACK");
        console.error("Erreur lors de l'insertion des achats :", error);
        return res.status(500).json({
            response: "Erreur lors de l'insertion des achats",
            response_time: 0
        });
    }
};



/////////////////////////////////////
// Fonction d'insertion de données //
/////////////////////////////////////

// Fonction pour insérer des utilisateurs
const insertUser = async (nbUser) => {
    console.log("Début de l'ajout des utilisateurs...");
    for (let i = 0; i < nbUser; i++) {
        const firstName = faker.faker.person.firstName();
        const lastName = faker.faker.person.lastName();
        await pool.query('INSERT INTO "User" (firstname, lastname) VALUES ($1, $2)', [firstName, lastName]);
    }
    console.log("Ajout des utilisateurs terminé !");
};

// Fonction pour insérer des produits
const insertProduct = async (nbProduct) => {
    console.log("Début de l'ajout des produits...");
    for (let i = 0; i < nbProduct; i++) {
        const productName = faker.faker.commerce.productName();
        const productPrice = faker.faker.commerce.price();
        await pool.query('INSERT INTO "Product" (name, price) VALUES ($1, $2)', [productName, productPrice]);
    }
    console.log("Ajout des produits terminé !");
};

// Fonction pour insérer des followers
const insertFollower = async () => {
    try {
        console.log("Début de l'ajout des followers...");

        // Récupérer les utilisateurs sans followers
        const { rows: usersWithoutFollowers } = await pool.query(`
            SELECT u.id FROM "User" u
            LEFT JOIN "Follow" f ON u.id = f.id_user
            WHERE f.id_user IS NULL;
        `);

        if (usersWithoutFollowers.length === 0) {
            console.log("Tous les utilisateurs ont déjà des followers.");
            return;
        }

        for (let user of usersWithoutFollowers) {
            // Générer un nombre aléatoire de followers (max 20)
            let numFollowers = Math.floor(Math.random() * 20) + 1;

            // Récupérer des followers aléatoires directement en SQL, en évitant l'utilisateur lui-même
            const { rows: potentialFollowers } = await pool.query(`
                SELECT id FROM "User"
                ORDER BY RANDOM()
                LIMIT $1;
            `, [numFollowers]);

            for (let follower of potentialFollowers) {
                await pool.query(
                    'INSERT INTO "Follow" (id_user, id_follower) VALUES ($1, $2) ON CONFLICT DO NOTHING',
                    [user.id, follower.id]
                );
            }
        }

        console.log("Ajout des followers terminé !");
    } catch (error) {
        console.error("Erreur lors de l'ajout des followers :", error);
    }
};


// Fonction pour insérer des achats
const insertOwn = async () => {
    try {
        console.log("Début de l'ajout des achats...");

        // Récupérer les utilisateurs sans produits
        const { rows: usersWithoutProducts } = await pool.query(`
            SELECT u.id FROM "User" u
            LEFT JOIN "Own" o ON u.id = o.id_user
            WHERE o.id_user IS NULL;
        `);

        if (usersWithoutProducts.length === 0) {
            console.log("Tous les utilisateurs possèdent déjà au moins un produit.");
            return;
        }

        for (let user of usersWithoutProducts) {
            // Générer un nombre aléatoire de produits (max 5)
            let numProducts = Math.floor(Math.random() * 5) + 1;

            // Récupérer des produits aléatoires directement en SQL
            const { rows: selectedProducts } = await pool.query(`
                SELECT id FROM "Product"
                ORDER BY RANDOM()
                LIMIT $1;
            `, [numProducts]);

            for (let product of selectedProducts) {
                await pool.query(
                    'INSERT INTO "Own" (id_user, id_product) VALUES ($1, $2) ON CONFLICT DO NOTHING',
                    [user.id, product.id]
                );
            }
        }

        console.log("Ajout des achats terminé !");
    } catch (error) {
        console.error("Erreur lors de l'ajout des achats :", error);
    }
};




module.exports = { runSetupSQL, insertMassiveUserSQL, insertMassiveProductSQL, insertMassiveFollowerSQL, insertMassiveOwnSQL, insertMassiveSQL };
