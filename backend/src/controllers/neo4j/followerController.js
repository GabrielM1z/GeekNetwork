const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const getFollowersProductsNeo4j = (userId, depth, res) => {
    const session = driver.session();

    // Générer la requête avec la profondeur dynamique
    const query = `
        MATCH (u:User {id: $userId})-[:FOLLOWS*1..${depth}]->(follower:User)-[:OWN]->(p:Product)
        RETURN p.name AS product, COUNT(p) AS quantity
        ORDER BY quantity DESC
    `;

    const startTime = performance.now();
    session.run(query, { userId: userId })
        .then(result => {
            const endTime = performance.now();
            const executionTime = (endTime - startTime).toFixed(2);
            const products = result.records.map(record => ({
                product: record.get('product'),
                quantity: record.get('quantity'),
            }));
            res.json({
                products: products,
                response_time: executionTime
            });
        })
        .catch(error => {
            console.error("Error running query:", error);
            res.status(500).send({
                error: "An error occurred while fetching data.",
                response_time: 0
            });
        })
        .finally(() => {
            session.close();
        });
};

module.exports = {
    getFollowersProductsNeo4j,
};
