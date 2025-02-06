const { Pool } = require("pg"); // Importation de la librairie PostgreSQL
const neo4j = require("neo4j-driver"); // Importation du driver Neo4j

// Connexion à PostgreSQL
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Fonction pour récupérer les utilisateurs depuis PostgreSQL
const getUsersSQL = (res) => {
  const query = "SELECT * FROM users LIMIT 10"; // Exemple de requête PostgreSQL

  pool.query(query)
    .then(result => {
      res.json({ users: result.rows }); // Renvoie les utilisateurs récupérés
    })
    .catch(err => {
      console.error("Erreur PostgreSQL:", err);
      res.status(500).json({ error: "Erreur de récupération des utilisateurs" });
    });
};

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
  getUsersSQL,
  getUsersNeo4j,
};
