const neo4j = require("neo4j-driver");
const fs = require("fs");
const path = require("path");
const faker = require('@faker-js/faker'); // Générateur de données fictives
const { use } = require("../../routes/initRoutes");
const { response } = require("express");


// Connexion à Neo4j
const driver = neo4j.driver(
    process.env.NEO4J_URI, // Exemple : "bolt://localhost:7687"
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const runSetupNoSQL = async (req, res) => {
    console.log("Route setup Neo4j exécutée...");

    const filePath = path.join(__dirname, "../../script/setup.cypher"); // Chemin vers le script Cypher

    try {
        // Lire le fichier setup.cypher
        const query = fs.readFileSync(filePath, "utf8");
        const session = driver.session();
        const queries = query.split(';').filter(q => q.trim() !== '');

        // Exécuter chaque requête séparément
        const startTime = performance.now();
        for (let q of queries) {
            await session.run(q.trim());
        }
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);

        await session.close();

        console.log("Base de données Neo4j initialisée !");

        res.json({
            response: "Base de données Neo4j initialisée avec succès",
            response_time: executionTime
        });
    } catch (error) {
        console.error("Erreur lors de l'initialisation de Neo4j :", error);
        res.status(500).json({
            response: "Échec de l'initialisation de Neo4j",
            response_time: 0
        });
    }
};


//////////////////////////////////
// Insérer des données massives //
//////////////////////////////////

// Fonction d'insertion massive
const insertMassiveNoSQL = async (req, res) => {
    const { nbUser, nbProduct } = req.body;  // Nombre d'utilisateurs et de produits à insérer
    console.log("Début de l'insertion massive des données...");

    const session = driver.session();
    const startTime = performance.now();

    // Démarrer la transaction
    const tx = session.beginTransaction();
    try {
        await insertUser(nbUser, tx);
        await tx.commit();
    } catch (error) {
        console.error("Erreur lors de l'insertion massive :", error);
        await tx.rollback();
        res.status(500).json({
            response: "Erreur lors de l'insertion massive",
            response_time: 0
        });
    }

    const tx1 = session.beginTransaction();
    try {
        await insertProduct(nbProduct, tx1);
        await tx1.commit();
    } catch (error) {
        console.error("Erreur lors de l'insertion massive :", error);
        await tx1.rollback();
        res.status(500).json({
            response: "Erreur lors de l'insertion massive",
            response_time: 0
        });
    }

    const tx2 = session.beginTransaction();
    try {
        await insertFollower(tx2);
        await tx2.commit();
    } catch (error) {
        console.error("Erreur lors de l'insertion massive :", error);
        await tx2.rollback();
        res.status(500).json({
            response: "Erreur lors de l'insertion massive",
            response_time: 0
        });
    }

    const tx3 = session.beginTransaction();
    try {
        await insertOwn(tx3);
        await tx3.commit();
    } catch (error) {
        console.error("Erreur lors de l'insertion massive :", error);
        await tx3.rollback();
        res.status(500).json({
            response: "Erreur lors de l'insertion massive",
            response_time: 0
        });
    }

    const endTime = performance.now();
    const executionTime = (endTime - startTime).toFixed(2);

    res.json({
        response: "Données insérées avec succès dans Neo4j",
        response_time: executionTime
    });

    await session.close();
}

// Fonction d'insertion massive pour les utilisateurs
const insertMassiveUserNoSQL = async (req, res) => {
    const { nbUser } = req.body;  // Nombre d'utilisateurs à insérer
    console.log("Début de l'insertion massive des utilisateurs...");

    const session = driver.session();

    // Démarrer la transaction
    const tx = session.beginTransaction();
    try {
        // Insérer les utilisateurs
        const startTime = performance.now();
        await insertUser(nbUser, tx);  // Passer la transaction à la fonction d'insertion
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);

        // Valider la transaction
        await tx.commit();
        console.log("Insertion des utilisateurs terminée !");
        res.json({
            response: "Utilisateurs insérés avec succès dans Neo4j",
            response_time: executionTime
        });

    } catch (error) {
        // Annuler la transaction en cas d'erreur
        console.error("Erreur lors de l'insertion des utilisateurs :", error);
        await tx.rollback();
        res.status(500).json({
            response: "Erreur lors de l'insertion des utilisateurs",
            response_time: 0
        });
    } finally {
        // Fermer la session Neo4j
        await session.close();
    }
};

// Fonction d'insertion massive pour les produits
const insertMassiveProductNoSQL = async (req, res) => {
    const { nbProduct } = req.body;  // Nombre de produits à insérer
    console.log("Début de l'insertion massive des produits...");

    const session = driver.session();

    // Démarrer la transaction
    const tx = session.beginTransaction();
    try {
        // Insérer les produits
        const startTime = performance.now();
        await insertProduct(nbProduct, tx);  // Passer la transaction à la fonction d'insertion
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);

        // Valider la transaction
        await tx.commit();
        console.log("Insertion des produits terminée !");
        res.json({
            response: "Produits insérés avec succès dans Neo4j",
            response_time: executionTime
        });

    } catch (error) {
        // Annuler la transaction en cas d'erreur
        console.error("Erreur lors de l'insertion des produits :", error);
        await tx.rollback();
        res.status(500).json({
            response: "Erreur lors de l'insertion des produits",
            response_time: 0
        });
    } finally {
        // Fermer la session Neo4j
        await session.close();
    }
};

// Fonction d'insertion massive pour les followers
const insertMassiveFollowerNoSQL = async (req, res) => {
    console.log("Début de l'insertion massive des followers...");

    const session = driver.session();

    // Démarrer la transaction
    const tx = session.beginTransaction();
    try {
        // Insérer les followers
        const startTime = performance.now();
        await insertFollower(tx);  // Passer la transaction à la fonction d'insertion
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);

        // Valider la transaction
        await tx.commit();
        console.log("Insertion des followers terminée !");
        res.json({
            response: "Followers insérés avec succès dans Neo4j",
            response_time: executionTime
        });

    } catch (error) {
        // Annuler la transaction en cas d'erreur
        console.error("Erreur lors de l'insertion des followers :", error);
        await tx.rollback();
        res.status(500).json({
            error: "Erreur lors de l'insertion des followers",
            response_time: 0
        });
    } finally {
        // Fermer la session Neo4j
        await session.close();
    }
};

// Fonction d'insertion massive pour les achats
const insertMassiveOwnNoSQL = async (req, res) => {
    console.log("Début de l'insertion massive des achats...");

    const session = driver.session();

    // Démarrer la transaction
    const tx = session.beginTransaction();
    try {
        // Insérer les achats
        const startTime = performance.now();
        await insertOwn(tx);  // Passer la transaction à la fonction d'insertion
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);

        // Valider la transaction
        await tx.commit();
        console.log("Insertion des achats terminée !");
        res.json({
            repsonse: "Achats insérés avec succès dans Neo4j",
            response_time: executionTime
        });

    } catch (error) {
        // Annuler la transaction en cas d'erreur
        console.error("Erreur lors de l'insertion des achats :", error);
        await tx.rollback();
        res.status(500).json({
            response: "Erreur lors de l'insertion des achats",
            response_time: 0
        });
    } finally {
        // Fermer la session Neo4j
        await session.close();
    }
};


/////////////////////////////////////
// Fonction d'insertion de données //
/////////////////////////////////////


// Fonction pour insérer des utilisateurs avec transaction
const insertUser = async (nbUser, tx) => {
    console.log("Début de l'ajout des utilisateurs...");

    for (let i = 0; i < nbUser; i++) {
        const firstName = faker.faker.person.firstName();
        const lastName = faker.faker.person.lastName();

        const cypherQuery = `
            CREATE (u:User {id: randomUUID(), firstName: $firstName, lastName: $lastName})
        `;
        await tx.run(cypherQuery, { firstName, lastName });
    }

    console.log("Ajout des utilisateurs terminé !");
};

// Fonction pour insérer des produits avec transaction
const insertProduct = async (nbProduct, tx) => {
    console.log("Début de l'ajout des produits...");

    for (let i = 0; i < nbProduct; i++) {
        const productName = faker.faker.commerce.productName();
        const productPrice = faker.faker.commerce.price();

        const cypherQuery = `
            CREATE (p:Product {id: randomUUID(), name: $productName, price: $productPrice})
        `;
        await tx.run(cypherQuery, { productName, productPrice }); // Utilisation de la transaction pour exécuter la requête
    }

    console.log("Ajout des produits terminé !");
};


// Fonction pour insérer des followers avec transaction
const insertFollower = async (tx) => {
    console.log("Début de l'ajout des followers...");

    // Exemple de récupération des utilisateurs sans followers
    const usersWithoutFollowersQuery = `
        MATCH (u:User)
        WHERE NOT EXISTS((u)-[:FOLLOWS]->())
        RETURN u.id AS userId
    `;
    const result = await tx.run(usersWithoutFollowersQuery); // Utilisation de la transaction pour exécuter la requête
    const usersWithoutFollowers = result.records.map(record => record.get('userId'));

    if (usersWithoutFollowers.length === 0) {
        console.log("Tous les utilisateurs ont déjà des followers.");
        return;
    }

    // Ajouter des followers
    const allUsersQuery = `MATCH (u:User) RETURN u.id AS userId`;
    const allUsersResult = await tx.run(allUsersQuery); // Utilisation de la transaction pour exécuter la requête
    const allUserIds = allUsersResult.records.map(record => record.get('userId'));

    for (let userId of usersWithoutFollowers) {
        let numFollowers = Math.floor(Math.random() * 20) + 1; // 1 à 20 followers
        let followers = new Set();

        while (followers.size < numFollowers) {
            let randomFollowerId = allUserIds[Math.floor(Math.random() * allUserIds.length)];
            followers.add(randomFollowerId);
        }

        for (let followerId of followers) {
            const cypherQuery = `
                MATCH (u:User {id: $userId})
                MATCH (f:User {id: $followerId})
                MERGE (f)-[:FOLLOWS]->(u)
            `;
            await tx.run(cypherQuery, { userId, followerId }); // Utilisation de la transaction pour exécuter la requête
        }
    }

    console.log("Ajout des followers terminé !");
};


// Fonction pour insérer des achats avec transaction
const insertOwn = async (tx) => {
    console.log("Début de l'ajout des achats...");

    // Exemple de récupération des utilisateurs sans produits
    const usersWithoutProductsQuery = `
        MATCH (u:User)
        WHERE NOT EXISTS((u)-[:OWNS]->())
        RETURN u.id AS userId
    `;
    const result = await tx.run(usersWithoutProductsQuery); // Utilisation de la transaction pour exécuter la requête
    const usersWithoutProducts = result.records.map(record => record.get('userId'));

    if (usersWithoutProducts.length === 0) {
        console.log("Tous les utilisateurs possèdent déjà au moins un produit.");
        return;
    }

    // Récupérer les produits disponibles
    const allProductsQuery = `MATCH (p:Product) RETURN p.id AS productId`;
    const allProductsResult = await tx.run(allProductsQuery); // Utilisation de la transaction pour exécuter la requête
    const allProductIds = allProductsResult.records.map(record => record.get('productId'));

    for (let userId of usersWithoutProducts) {
        let numProducts = Math.floor(Math.random() * 5) + 1; // 1 à 5 produits
        let selectedProducts = new Set();

        while (selectedProducts.size < numProducts) {
            let randomProductId = allProductIds[Math.floor(Math.random() * allProductIds.length)];
            selectedProducts.add(randomProductId);
        }

        for (let productId of selectedProducts) {
            const cypherQuery = `
                MATCH (u:User {id: $userId})
                MATCH (p:Product {id: $productId})
                MERGE (u)-[:OWNS]->(p)
            `;
            await tx.run(cypherQuery, { userId, productId }); // Utilisation de la transaction pour exécuter la requête
        }
    }

    console.log("Ajout des achats terminé !");
};


module.exports = { runSetupNoSQL, insertMassiveUserNoSQL, insertMassiveProductNoSQL, insertMassiveFollowerNoSQL, insertMassiveOwnNoSQL, insertMassiveNoSQL };
