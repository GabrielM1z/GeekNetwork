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

        // Vérifier s'il y a des utilisateurs sans followers
        if (usersWithoutFollowers.length === 0) {
            console.log("Tous les utilisateurs ont déjà des followers.");
            return;
        }

        // Récupérer tous les IDs d'utilisateurs
        const { rows: allUserIds } = await pool.query('SELECT id FROM "User";');

        for (let user of usersWithoutFollowers) {
            let numFollowers = Math.floor(Math.random() * 20) + 1; // 1 à 20 followers
            let followers = new Set();

            while (followers.size < numFollowers) {
                let randomFollower = allUserIds[Math.floor(Math.random() * allUserIds.length)].id;
                followers.add(randomFollower);
            }

            for (let follower of followers) {
                await pool.query(
                    'INSERT INTO "Follow" (id_user, id_follower) VALUES ($1, $2) ON CONFLICT DO NOTHING',
                    [user.id, follower]
                );
            }
        }

        console.log("Ajout des followers terminé !");
    } catch (error) {
        console.error("Erreur lors de l'ajout des followers :", error);
    }
};


const insertOwn = async () => {
    try {
        console.log("Début de l'ajout des achats...");

        // Récupérer les utilisateurs qui n'ont pas encore acheté de produit
        const { rows: usersWithoutProducts } = await pool.query(`
            SELECT u.id FROM "User" u
            LEFT JOIN "Own" o ON u.id = o.id_user
            WHERE o.id_user IS NULL;
        `);

        // Vérifier s'il y a des utilisateurs sans produits
        if (usersWithoutProducts.length === 0) {
            console.log("Tous les utilisateurs possèdent déjà au moins un produit.");
            return;
        }

        // Récupérer tous les produits existants
        const { rows: allProducts } = await pool.query('SELECT id FROM "Product";');

        // Vérifier qu'il y a bien des produits disponibles
        if (allProducts.length === 0) {
            console.log("Aucun produit disponible, impossible d'ajouter des achats.");
            return;
        }

        for (let user of usersWithoutProducts) {

            // Vérifier que l'utilisateur existe avant d'ajouter un achat
            const { rows: userExists } = await pool.query('SELECT id FROM "User" WHERE id = $1', [user.id]);

            if (userExists.length === 0) {
                console.log(`L'utilisateur avec l'ID ${user.id} n'existe pas. Skipping.`);
            }
            else {
                let numProducts = Math.floor(Math.random() * 5) + 1; // 1 à 5 produits
                let selectedProducts = new Set();

                while (selectedProducts.size < numProducts) {
                    let randomProduct = allProducts[Math.floor(Math.random() * allProducts.length)].id;
                    selectedProducts.add(randomProduct);
                }

                for (let product of selectedProducts) {
                    await pool.query(
                        'INSERT INTO "Own" (id_user, id_product) VALUES ($1, $2) ON CONFLICT DO NOTHING',
                        [user.id, product]
                    );
                }
            }
        }

        console.log("Ajout des achats terminé !");
    } catch (error) {
        console.error("Erreur lors de l'ajout des achats :", error);
    }
};



module.exports = { runSetupSQL, insertMassiveUserSQL, insertMassiveProductSQL, insertMassiveFollowerSQL, insertMassiveOwnSQL };
