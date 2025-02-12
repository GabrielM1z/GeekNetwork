// Suppression de toutes les données existantes
MATCH (n) DETACH DELETE n;

//////////////////////////////////////////
// Création des utilisateurs
//////////////////////////////////////////
CREATE (:User {id: "1", firstName: "Alice", lastName: "Martin"});
CREATE (:User {id: "2", firstName: "Bob", lastName: "Dupont"});
CREATE (:User {id: "3", firstName: "Charlie", lastName: "Lemoine"});
CREATE (:User {id: "4", firstName: "David", lastName: "Cohen"});
CREATE (:User {id: "5", firstName: "Emma", lastName: "Bernard"});
CREATE (:User {id: "6", firstName: "Fanny", lastName: "Morel"});
CREATE (:User {id: "7", firstName: "Georges", lastName: "Dubois"});
CREATE (:User {id: "8", firstName: "Hugo", lastName: "Lefevre"});
CREATE (:User {id: "9", firstName: "Isabelle", lastName: "Garcia"});
CREATE (:User {id: "10", firstName: "Jules", lastName: "Roux"});

//////////////////////////////////////////
// Création des produits
//////////////////////////////////////////
CREATE (:Product {id: "101", name: "Ordinateur Portable", price: 999.99});
CREATE (:Product {id: "102", name: "Smartphone", price: 799.99});
CREATE (:Product {id: "103", name: "Casque Bluetooth", price: 199.99});
CREATE (:Product {id: "104", name: "Souris Gaming", price: 49.99});
CREATE (:Product {id: "105", name: "Clavier Mécanique", price: 89.99});
CREATE (:Product {id: "106", name: "Écran 4K", price: 399.99});
CREATE (:Product {id: "107", name: "Chaise Ergonomique", price: 299.99});
CREATE (:Product {id: "108", name: "Tablette Graphique", price: 249.99});
CREATE (:Product {id: "109", name: "Disque Dur Externe", price: 129.99});
CREATE (:Product {id: "110", name: "Enceinte Connectée", price: 149.99});

//////////////////////////////////////////
// Création des relations OWN (possession de produits)
//////////////////////////////////////////
MATCH (u1:User {id: "1"}), (p1:Product {id: "101"}) CREATE (u1)-[:OWNS]->(p1);
MATCH (u2:User {id: "2"}), (p2:Product {id: "102"}) CREATE (u2)-[:OWNS]->(p2);
MATCH (u3:User {id: "3"}), (p3:Product {id: "103"}) CREATE (u3)-[:OWNS]->(p3);
MATCH (u4:User {id: "4"}), (p4:Product {id: "104"}) CREATE (u4)-[:OWNS]->(p4);
MATCH (u5:User {id: "5"}), (p5:Product {id: "105"}) CREATE (u5)-[:OWNS]->(p5);
MATCH (u6:User {id: "6"}), (p6:Product {id: "106"}) CREATE (u6)-[:OWNS]->(p6);
MATCH (u7:User {id: "7"}), (p7:Product {id: "107"}) CREATE (u7)-[:OWNS]->(p7);
MATCH (u8:User {id: "8"}), (p8:Product {id: "108"}) CREATE (u8)-[:OWNS]->(p8);
MATCH (u9:User {id: "9"}), (p9:Product {id: "109"}) CREATE (u9)-[:OWNS]->(p9);
MATCH (u10:User {id: "10"}), (p10:Product {id: "110"}) CREATE (u10)-[:OWNS]->(p10);

//////////////////////////////////////////
// Création des relations FOLLOW (utilisateurs qui suivent d'autres utilisateurs)
//////////////////////////////////////////
MATCH (u1:User {id: "1"}), (u2:User {id: "2"}) CREATE (u1)-[:FOLLOWS]->(u2);
MATCH (u3:User {id: "3"}), (u4:User {id: "4"}) CREATE (u3)-[:FOLLOWS]->(u4);
MATCH (u5:User {id: "5"}), (u6:User {id: "6"}) CREATE (u5)-[:FOLLOWS]->(u6);
MATCH (u7:User {id: "7"}), (u8:User {id: "8"}) CREATE (u7)-[:FOLLOWS]->(u8);
MATCH (u9:User {id: "9"}), (u10:User {id: "10"}) CREATE (u9)-[:FOLLOWS]->(u10);
MATCH (u2:User {id: "2"}), (u3:User {id: "3"}) CREATE (u2)-[:FOLLOWS]->(u3);
MATCH (u4:User {id: "4"}), (u5:User {id: "5"}) CREATE (u4)-[:FOLLOWS]->(u5);
MATCH (u6:User {id: "6"}), (u7:User {id: "7"}) CREATE (u6)-[:FOLLOWS]->(u7);
MATCH (u8:User {id: "8"}), (u9:User {id: "9"}) CREATE (u8)-[:FOLLOWS]->(u9);
