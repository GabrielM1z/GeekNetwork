const neo4j = require("neo4j-driver");
const fs = require("fs");
const path = require("path");

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

        // Ouvrir une session Neo4j
        const session = driver.session();

        // Diviser les requêtes en un tableau
        const queries = query.split(';').filter(q => q.trim() !== '');

        // Exécuter chaque requête séparément
        for (let q of queries) {
            await session.run(q.trim());
        }

        // Fermer la session
        await session.close();

        console.log("Base de données Neo4j initialisée !");
        res.json({ message: "Base de données Neo4j initialisée avec succès" });
    } catch (error) {
        console.error("Erreur lors de l'initialisation de Neo4j :", error);
        res.status(500).json({ error: "Échec de l'initialisation de Neo4j" });
    }
};


//////////////////////////////////
// Insérer des données massives //
//////////////////////////////////

// Fonction d'insertion massive pour les utilisateurs
const insertMassiveUserNoSQL = async (req, res) => {
    const { nbUser } = req.body;  // Nombre d'utilisateurs à insérer
    console.log("Début de l'insertion massive des utilisateurs...");

    const session = driver.session();

    try {
        // Démarrer la transaction
        const tx = session.beginTransaction();

        // Insérer les utilisateurs
        await insertUser(nbUser, tx);  // Passer la transaction à la fonction d'insertion

        // Valider la transaction
        await tx.commit();
        console.log("Insertion des utilisateurs terminée !");
        res.json({ message: "Utilisateurs insérés avec succès dans Neo4j" });

    } catch (error) {
        // Annuler la transaction en cas d'erreur
        console.error("Erreur lors de l'insertion des utilisateurs :", error);
        await session.rollback();
        res.status(500).json({ error: "Erreur lors de l'insertion des utilisateurs" });
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

    try {
        // Démarrer la transaction
        const tx = session.beginTransaction();

        // Insérer les produits
        await insertProduct(nbProduct, tx);  // Passer la transaction à la fonction d'insertion

        // Valider la transaction
        await tx.commit();
        console.log("Insertion des produits terminée !");
        res.json({ message: "Produits insérés avec succès dans Neo4j" });

    } catch (error) {
        // Annuler la transaction en cas d'erreur
        console.error("Erreur lors de l'insertion des produits :", error);
        await session.rollback();
        res.status(500).json({ error: "Erreur lors de l'insertion des produits" });
    } finally {
        // Fermer la session Neo4j
        await session.close();
    }
};

// Fonction d'insertion massive pour les followers
const insertMassiveFollowerNoSQL = async (req, res) => {
    console.log("Début de l'insertion massive des followers...");

    const session = driver.session();

    try {
        // Démarrer la transaction
        const tx = session.beginTransaction();

        // Insérer les followers
        await insertFollower(tx);  // Passer la transaction à la fonction d'insertion

        // Valider la transaction
        await tx.commit();
        console.log("Insertion des followers terminée !");
        res.json({ message: "Followers insérés avec succès dans Neo4j" });

    } catch (error) {
        // Annuler la transaction en cas d'erreur
        console.error("Erreur lors de l'insertion des followers :", error);
        await session.rollback();
        res.status(500).json({ error: "Erreur lors de l'insertion des followers" });
    } finally {
        // Fermer la session Neo4j
        await session.close();
    }
};

// Fonction d'insertion massive pour les achats
const insertMassiveOwnNoSQL = async (req, res) => {
    console.log("Début de l'insertion massive des achats...");

    const session = driver.session();

    try {
        // Démarrer la transaction
        const tx = session.beginTransaction();

        // Insérer les achats
        await insertOwn(tx);  // Passer la transaction à la fonction d'insertion

        // Valider la transaction
        await tx.commit();
        console.log("Insertion des achats terminée !");
        res.json({ message: "Achats insérés avec succès dans Neo4j" });

    } catch (error) {
        // Annuler la transaction en cas d'erreur
        console.error("Erreur lors de l'insertion des achats :", error);
        await session.rollback();
        res.status(500).json({ error: "Erreur lors de l'insertion des achats" });
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
            CREATE (u:User {id: '${faker.datatype.uuid()}', firstName: '${firstName}', lastName: '${lastName}'})
        `;
        await tx.run(cypherQuery); // Utilisation de la transaction pour exécuter la requête
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
            CREATE (p:Product {id: '${faker.datatype.uuid()}', name: '${productName}', price: ${productPrice}})
        `;
        await tx.run(cypherQuery); // Utilisation de la transaction pour exécuter la requête
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
                MATCH (u:User {id: '${userId}'})
                MATCH (f:User {id: '${followerId}'})
                MERGE (f)-[:FOLLOWS]->(u)
            `;
            await tx.run(cypherQuery); // Utilisation de la transaction pour exécuter la requête
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
                MATCH (u:User {id: '${userId}'})
                MATCH (p:Product {id: '${productId}'})
                MERGE (u)-[:OWNS]->(p)
            `;
            await tx.run(cypherQuery); // Utilisation de la transaction pour exécuter la requête
        }
    }

    console.log("Ajout des achats terminé !");
};


module.exports = { runSetupNoSQL, insertMassiveUserNoSQL, insertMassiveProductNoSQL, insertMassiveFollowerNoSQL, insertMassiveOwnNoSQL };
