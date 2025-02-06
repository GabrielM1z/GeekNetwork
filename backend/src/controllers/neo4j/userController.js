const neo4j = require("neo4j-driver"); // Importation du driver Neo4j


// Connexion à Neo4j
const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

// Fonction pour récupérer les utilisateurs depuis Neo4j
const getUsersNeo4j = (res) => {
    const session = driver.session();
    const query = "MATCH (u:User) RETURN u LIMIT 10"; // Exemple de requête Neo4j

    session.run(query)
        .then(result => {
            const users = result.records.map(record => record.get("u").properties);
            res.json({ users }); // Renvoie les utilisateurs récupérés depuis Neo4j
        })
        .catch(err => {
            console.error("Erreur Neo4j:", err);
            res.status(500).json({ error: "Erreur de récupération des utilisateurs" });
        })
        .finally(() => {
            session.close();
        });
};

module.exports = {
    getUsersNeo4j,
};
