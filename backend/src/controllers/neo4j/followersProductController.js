const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const getFollowersProductsForSpecificProductNeo4j = (userId, depth, productId, res) => {
    const session = driver.session();

    // Générer la requête avec la profondeur dynamique et l'ID du produit spécifique
    const query = `
        MATCH (u:User {id: $userId})-[:FOLLOWS*1..${depth}]->(follower:User)-[:OWN]->(p:Product {id: $productId})
        RETURN p.id AS product_id, p.name AS product_name, COUNT(p) AS purchase_count
        ORDER BY purchase_count DESC
    `;

    session.run(query, { userId: userId, productId: productId })
        .then(result => {
            const products = result.records.map(record => ({
                product_id: record.get('product_id'),
                product_name: record.get('product_name'),
                purchase_count: record.get('purchase_count').toInt() // Convertir le résultat en entier
            }));
            res.json({ products: products });
        })
        .catch(error => {
            console.error("Error running query:", error);
            res.status(500).send("An error occurred while fetching data.");
        })
        .finally(() => {
            session.close();
        });
};

module.exports = {
    getFollowersProductsForSpecificProductNeo4j,
};
