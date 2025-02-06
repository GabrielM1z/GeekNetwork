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
