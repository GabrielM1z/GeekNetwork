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

module.exports = { runSetupNoSQL };
