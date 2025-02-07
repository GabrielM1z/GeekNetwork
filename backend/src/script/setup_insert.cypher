// Suppression de toutes les données existantes
MATCH (n) DETACH DELETE n;

//////////////////////////////////////////
// Création des utilisateurs
//////////////////////////////////////////
CREATE (:User {id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", firstname: "Utilisateur", lastname: "A"});
CREATE (:User {id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb", firstname: "Utilisateur", lastname: "B"});
CREATE (:User {id: "cccccccc-cccc-cccc-cccc-cccccccccccc", firstname: "Utilisateur", lastname: "C"});
CREATE (:User {id: "dddddddd-dddd-dddd-dddd-dddddddddddd", firstname: "Utilisateur", lastname: "D"});

//////////////////////////////////////////
// Création des produits
//////////////////////////////////////////
CREATE (:Product {id: "11111111-1111-1111-1111-111111111111", name: "Casque Bluetooth", price: 199.99});
CREATE (:Product {id: "22222222-2222-2222-2222-222222222222", name: "Écran 4K", price: 399.99});
CREATE (:Product {id: "33333333-3333-3333-3333-333333333333", name: "Enceinte", price: 399.99});
CREATE (:Product {id: "44444444-4444-4444-4444-444444444444", name: "Rino", price: 399.99});

//////////////////////////////////////////
// Création des relations OWN (possession de produits)
//////////////////////////////////////////
MATCH (u1:User {id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"}), (p1:Product {id: "11111111-1111-1111-1111-111111111111"}) CREATE (u1)-[:OWN]->(p1);
MATCH (u2:User {id: "cccccccc-cccc-cccc-cccc-cccccccccccc"}), (p2:Product {id: "22222222-2222-2222-2222-222222222222"}) CREATE (u2)-[:OWN]->(p2);
MATCH (u3:User {id: "dddddddd-dddd-dddd-dddd-dddddddddddd"}), (p3:Product {id: "33333333-3333-3333-3333-333333333333"}) CREATE (u3)-[:OWN]->(p3);
MATCH (u2:User {id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"}), (p4:Product {id: "44444444-4444-4444-4444-444444444444"}) CREATE (u2)-[:OWN]->(p4);
MATCH (u3:User {id: "cccccccc-cccc-cccc-cccc-cccccccccccc"}), (p4:Product {id: "44444444-4444-4444-4444-444444444444"}) CREATE (u3)-[:OWN]->(p4);
MATCH (u4:User {id: "dddddddd-dddd-dddd-dddd-dddddddddddd"}), (p4:Product {id: "44444444-4444-4444-4444-444444444444"}) CREATE (u4)-[:OWN]->(p4);
MATCH (u4:User {id: "dddddddd-dddd-dddd-dddd-dddddddddddd"}), (p4:Product {id: "44444444-4444-4444-4444-444444444444"}) CREATE (u4)-[:OWN]->(p4);

//////////////////////////////////////////
// Création des relations FOLLOW (utilisateurs qui suivent d'autres utilisateurs)
//////////////////////////////////////////
MATCH (u1:User {id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}), (u2:User {id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"}) CREATE (u1)-[:FOLLOWS]->(u2);
MATCH (u2:User {id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"}), (u3:User {id: "cccccccc-cccc-cccc-cccc-cccccccccccc"}) CREATE (u2)-[:FOLLOWS]->(u3);
MATCH (u4:User {id: "dddddddd-dddd-dddd-dddd-dddddddddddd"}), (u3:User {id: "cccccccc-cccc-cccc-cccc-cccccccccccc"}) CREATE (u4)-[:FOLLOWS]->(u3);
MATCH (u3:User {id: "cccccccc-cccc-cccc-cccc-cccccccccccc"}), (u4:User {id: "dddddddd-dddd-dddd-dddd-dddddddddddd"}) CREATE (u3)-[:FOLLOWS]->(u4);
