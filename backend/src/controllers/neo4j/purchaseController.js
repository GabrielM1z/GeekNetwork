const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const getPurchasesNeo4j = (userId, res) => {
    const session = driver.session();
    const query = `
        MATCH (u:User)-[:OWN]->(p:Product)
        WHERE u.id = $userId
        RETURN p
    `;
    session.run(query, { userId })
        .then(result => {
            const purchases = result.records.map(record => record.get("p").properties);
            res.json({ purchases });
        })
        .catch(err => {
            console.error("Erreur Neo4j:", err);
            res.status(500).json({ error: "Erreur de récupération des achats" });
        })
        .finally(() => {
            session.close();
        });
};

module.exports = {
    getPurchasesNeo4j,
};
