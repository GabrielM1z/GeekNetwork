require('dotenv').config();
const neo4j = require('neo4j-driver');
dbms.connector.bolt.tls_level = DISABLED

// Crée le driver avec les informations de connexion
const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const session = driver.session();

const testConnection = async () => {
    try {
        // Essaie une requête simple pour tester la connexion
        const result = await session.run('RETURN 1');
        console.log('Connexion réussie à Neo4j:', result);
    } catch (error) {
        console.error('Erreur de connexion à Neo4j:', error);
    } finally {
        await session.close();
    }
};

testConnection();

module.exports = driver;
