const neo4j = require('neo4j-driver');
const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);
const session = driver.session();

const getTopElementsNeo4j = (table, limit, res) => {
    let query = '';
    switch (table) {
        case 'User':
            query = `MATCH (u:User) RETURN u.id AS id, u.firstName AS firstName, u.lastName AS lastName LIMIT ${limit}`;
            break;
        case 'Product':
            query = `MATCH (p:Product) RETURN p.id AS id, p.name AS name, p.price AS price LIMIT ${limit}`;
            break;
        case 'Own':
            query = `
                MATCH (u:User)-[:OWN]->(p:Product)
                RETURN u.firstName AS firstName, u.lastName AS lastName, p.name AS productName, u.id AS id_user, p.id AS id_product
                LIMIT ${limit}
            `;
            break;
        case 'Follow':
            query = `
                MATCH (u:User)-[:FOLLOWS]->(f:User)
                RETURN u.firstName AS firstName, u.lastName AS lastName, f.id AS id_follower
                LIMIT ${limit}
            `;
            break;
        case 'Count':
            query = 'MATCH (u:User) RETURN COUNT(u) AS total_users';
            break;
        default:
            return res.status(400).send("Table non valide");
    }

    const startTime = performance.now();
    session.run(query)
        .then(result => {
            const endTime = performance.now();
            const executionTime = (endTime - startTime).toFixed(2);
            res.json({
                response: "Requête Cypher exécutée avec succès.",
                response_time: executionTime,
                data: result.records.map(record => record.toObject())
            });
        })
        .catch(err => {
            console.error("Erreur Neo4j:", err);
            res.status(500).json({
                error: "Erreur de récupération des éléments",
                response_time: 0,
            });
        });
};

module.exports = {
    getTopElementsNeo4j,
};
