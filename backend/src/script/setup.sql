DROP TABLE IF EXISTS "Follow";
DROP TABLE IF EXISTS "Own";
DROP TABLE IF EXISTS "Product";
DROP TABLE IF EXISTS "User";

-- Create tables

CREATE TABLE "User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL
);

CREATE TABLE "Product" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL
);

CREATE TABLE "Own" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_user UUID NOT NULL,
    id_product UUID NOT NULL,
    FOREIGN KEY (id_user) REFERENCES "User"(id) ON DELETE CASCADE,
    FOREIGN KEY (id_product) REFERENCES "Product"(id) ON DELETE CASCADE
);

CREATE TABLE "Follow" (
    id_user UUID NOT NULL,
    id_follower UUID NOT NULL,
    PRIMARY KEY (id_user, id_follower),
    FOREIGN KEY (id_user) REFERENCES "User"(id) ON DELETE CASCADE,
    FOREIGN KEY (id_follower) REFERENCES "User"(id) ON DELETE CASCADE
);


-- Insérer des utilisateurs
INSERT INTO "User" (id, firstname, lastname) VALUES
(gen_random_uuid(), 'Alice', 'Martin'),
(gen_random_uuid(), 'Bob', 'Dupont'),
(gen_random_uuid(), 'Charlie', 'Lemoine'),
(gen_random_uuid(), 'David', 'Cohen'),
(gen_random_uuid(), 'Emma', 'Bernard'),
(gen_random_uuid(), 'Fanny', 'Morel'),
(gen_random_uuid(), 'Georges', 'Dubois'),
(gen_random_uuid(), 'Hugo', 'Lefevre'),
(gen_random_uuid(), 'Isabelle', 'Garcia'),
(gen_random_uuid(), 'Jules', 'Roux');

-- Insérer des produits
INSERT INTO "Product" (id, name, price) VALUES
(gen_random_uuid(), 'Ordinateur Portable', 999.99),
(gen_random_uuid(), 'Smartphone', 799.99),
(gen_random_uuid(), 'Casque Bluetooth', 199.99),
(gen_random_uuid(), 'Souris Gaming', 49.99),
(gen_random_uuid(), 'Clavier Mécanique', 89.99),
(gen_random_uuid(), 'Écran 4K', 399.99),
(gen_random_uuid(), 'Chaise Ergonomique', 299.99),
(gen_random_uuid(), 'Tablette Graphique', 249.99),
(gen_random_uuid(), 'Disque Dur Externe', 129.99),
(gen_random_uuid(), 'Enceinte Connectée', 149.99);

-- Insérer des relations "Own" (Possession de produits par des utilisateurs)
INSERT INTO "Own" (id, id_user, id_product) 
VALUES
(gen_random_uuid(), (SELECT id FROM "User" ORDER BY RANDOM() LIMIT 1), (SELECT id FROM "Product" ORDER BY RANDOM() LIMIT 1)),
(gen_random_uuid(), (SELECT id FROM "User" ORDER BY RANDOM() LIMIT 1), (SELECT id FROM "Product" ORDER BY RANDOM() LIMIT 1)),
(gen_random_uuid(), (SELECT id FROM "User" ORDER BY RANDOM() LIMIT 1), (SELECT id FROM "Product" ORDER BY RANDOM() LIMIT 1)),
(gen_random_uuid(), (SELECT id FROM "User" ORDER BY RANDOM() LIMIT 1), (SELECT id FROM "Product" ORDER BY RANDOM() LIMIT 1)),
(gen_random_uuid(), (SELECT id FROM "User" ORDER BY RANDOM() LIMIT 1), (SELECT id FROM "Product" ORDER BY RANDOM() LIMIT 1));

-- Insérer des relations "Follow" (Utilisateur suivant un autre utilisateur)
INSERT INTO "Follow" (id_user, id_follower)
SELECT u1.id, u2.id
FROM (SELECT id FROM "User" ORDER BY RANDOM() LIMIT 5) u1,
    (SELECT id FROM "User" ORDER BY RANDOM() LIMIT 5) u2
WHERE u1.id <> u2.id  -- Évite qu'un utilisateur se suive lui-même
AND NOT EXISTS (  -- Vérifie que la relation n'existe pas déjà
    SELECT 1 FROM "Follow" f 
    WHERE f.id_user = u1.id AND f.id_follower = u2.id
);

