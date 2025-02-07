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
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Utilisateur', 'A'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Utilisateur', 'B'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Utilisateur', 'C'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Utilisateur', 'D');

-- Insérer des produits
INSERT INTO "Product" (id, name, price) VALUES
('11111111-1111-1111-1111-111111111111', 'Casque Bluetooth', 199.99),
('22222222-2222-2222-2222-222222222222', 'Écran 4K', 399.99),
('33333333-3333-3333-3333-333333333333', 'Enceinte', 399.99);

-- Insérer des relations "Own" (Possession de produits par des utilisateurs)
INSERT INTO "Own" (id, id_user, id_product) VALUES
('aaaa1111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111'),
('bbbb2222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222'),
('cccc3333-cccc-cccc-cccc-cccccccccccc', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '33333333-3333-3333-3333-333333333333');

-- Insérer des relations "Follow" (Utilisateur suivant un autre utilisateur)
INSERT INTO "Follow" (id_user, id_follower) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'cccccccc-cccc-cccc-cccc-cccccccccccc'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'cccccccc-cccc-cccc-cccc-cccccccccccc'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'dddddddd-dddd-dddd-dddd-dddddddddddd');