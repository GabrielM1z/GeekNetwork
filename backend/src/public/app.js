// Fonction pour afficher/masquer les champs de la requête followers
function toggleFollowersFields() {
    const fields = document.getElementById('followers-fields');
    fields.style.display = (fields.style.display === 'none' || fields.style.display === '') ? 'block' : 'none';
}

// Fonction pour afficher/masquer les champs de la requête followersProducts
function toggleFollowersProductsFields() {
    const fields = document.getElementById('followersProducts-fields');
    fields.style.display = (fields.style.display === 'none' || fields.style.display === '') ? 'block' : 'none';
}

// Fonction pour effectuer une requête POST sur /api/users/:id/followers/:depth/products
function followers() {
    const dbType = document.querySelector('select[name="db"]').value; // Utilisation de select pour la base de données
    const userId = document.getElementById('userId').value;
    const depth = document.getElementById('depth').value;
    const startTime = Date.now();

    fetch('/api/followers/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            depth: depth,
            dbType: dbType
        })
    })
        .then(response => response.json())
        .then(data => {
            const elapsedTime = Date.now() - startTime;
            document.getElementById('response').innerHTML = JSON.stringify(data.products, null, 2);
            document.getElementById('time').innerText = `Temps de réponse : ${elapsedTime} ms`;
            document.getElementById('followers-fields').style.display = 'none';
        })
        .catch(err => {
            document.getElementById('response').innerText = 'Erreur lors de la requête';
            console.error(err);
        });
}

// Fonction pour effectuer une requête POST sur /api/users/:id/followers/:depth/products
function followersProducts() {
    const dbType = document.querySelector('select[name="db"]').value; // Utilisation de select pour la base de données
    const userId = document.getElementById('userId-products').value;
    const depth = document.getElementById('depth-products').value;
    const productId = document.getElementById('productId').value;
    const startTime = Date.now();

    fetch('/api/followers/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            depth: depth,
            dbType: dbType,
            productId: productId
        })
    })
        .then(response => response.json())
        .then(data => {
            const elapsedTime = Date.now() - startTime;
            document.getElementById('response').innerHTML = JSON.stringify(data.products, null, 2);
            document.getElementById('time').innerText = `Temps de réponse : ${elapsedTime} ms`;
            document.getElementById('followersProducts-fields').style.display = 'none';
        })
        .catch(err => {
            document.getElementById('response').innerText = 'Erreur lors de la requête';
            console.error(err);
        });
}

// Fonction pour initialiser PostgreSQL
function initSql() {
    fetch('http://localhost:5000/API/INIT-pgsql')
        .then(response => response.json())
        .then(data => {
            document.getElementById('initResponse').innerText = data.message;  // Affiche le message de succès dans un champ
        })
        .catch(err => {
            document.getElementById('initResponse').innerText = 'Erreur lors de l\'initialisation de PostgreSQL'; // Affiche l'erreur
            console.error(err);
        });
}

// Fonction pour initialiser Neo4j
function initNoSql() {
    fetch('http://localhost:5000/API/INIT-neo4j')
        .then(response => response.json())
        .then(data => {
            document.getElementById('initResponse').innerText = data.message;  // Affiche le message de succès dans un champ
        })
        .catch(err => {
            document.getElementById('initResponse').innerText = 'Erreur lors de l\'initialisation de Neo4j'; // Affiche l'erreur
            console.error(err);
        });
}































// Initialisation du graphique avec Chart.js
const ctx = document.getElementById('requestChart').getContext('2d');
const requestChart = new Chart(ctx, {
    type: 'line', // Type de graphique
    data: {
        labels: [], // Les labels seront les numéros des requêtes
        datasets: [{
            label: 'Temps de requête (ms)',
            data: [], // Les temps de requêtes
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear', // Les labels seront des numéros de requêtes
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Numéro de requête'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Temps (ms)'
                },
                min: 0,
            }
        }
    }
});

// Variable pour suivre le numéro de la requête
let requestCount = 0;

// Fonction pour effectuer une requête POST sur /api/users/:id/followers/:depth/products
function followers() {
    const dbType = document.querySelector('select[name="db"]').value;
    const userId = document.getElementById('userId').value;
    const depth = document.getElementById('depth').value;
    const startTime = Date.now();

    fetch('/api/followers/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            depth: depth,
            dbType: dbType
        })
    })
        .then(response => response.json())
        .then(data => {
            const elapsedTime = Date.now() - startTime;

            // Mettre à jour la réponse affichée
            document.getElementById('response').innerHTML = JSON.stringify(data.products, null, 2);
            document.getElementById('time').innerText = `Temps de réponse : ${elapsedTime} ms`;

            // Mettre à jour le graphique avec le temps de la requête
            requestChart.data.labels.push(requestCount); // Ajouter le numéro de la requête
            requestChart.data.datasets[0].data.push(elapsedTime); // Ajouter le temps de la requête
            requestChart.update(); // Rafraîchir le graphique

            // Masquer la div 'followers-fields' si la réponse est obtenue
            document.getElementById('followers-fields').style.display = 'none';

            // Augmenter le compteur de requêtes
            requestCount++;
        })
        .catch(err => {
            document.getElementById('response').innerText = 'Erreur lors de la requête';
            console.error(err);
        });
}

// Fonction pour effectuer une requête POST sur /api/users/:id/followers/:depth/products
function followersProducts() {
    const dbType = document.querySelector('select[name="db"]').value;
    const userId = document.getElementById('userId-products').value;
    const depth = document.getElementById('depth-products').value;
    const productId = document.getElementById('productId').value;
    const startTime = Date.now();

    fetch('/api/followers/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            depth: depth,
            dbType: dbType,
            productId: productId
        })
    })
        .then(response => response.json())
        .then(data => {
            const elapsedTime = Date.now() - startTime;

            // Mettre à jour la réponse affichée
            document.getElementById('response').innerHTML = JSON.stringify(data.products, null, 2);
            document.getElementById('time').innerText = `Temps de réponse : ${elapsedTime} ms`;

            // Mettre à jour le graphique avec le temps de la requête
            requestChart.data.labels.push(requestCount); // Ajouter le numéro de la requête
            requestChart.data.datasets[0].data.push(elapsedTime); // Ajouter le temps de la requête
            requestChart.update(); // Rafraîchir le graphique

            // Masquer la div 'followersProducts-fields' si la réponse est obtenue
            document.getElementById('followersProducts-fields').style.display = 'none';

            // Augmenter le compteur de requêtes
            requestCount++;
        })
        .catch(err => {
            document.getElementById('response').innerText = 'Erreur lors de la requête';
            console.error(err);
        });
}
// Fonction pour ajouter une entrée à l'historique dans le tableau
function addToHistory(queryName, elapsedTime, dbType, params) {
    const historyTable = document.getElementById('historyTable').getElementsByTagName('tbody')[0];

    // Créer une nouvelle ligne de tableau
    const newRow = historyTable.insertRow();

    // Créer les cellules pour la ligne
    const dateCell = newRow.insertCell(0);
    const queryNameCell = newRow.insertCell(1);
    const elapsedTimeCell = newRow.insertCell(2);
    const dbTypeCell = newRow.insertCell(3);
    const paramsCell = newRow.insertCell(4);

    // Ajouter les données dans les cellules
    dateCell.innerText = new Date().toLocaleString(); // Date et heure actuelles
    queryNameCell.innerText = queryName;
    elapsedTimeCell.innerText = elapsedTime;
    dbTypeCell.innerText = dbType;
    paramsCell.innerText = JSON.stringify(params); // Afficher les paramètres sous forme de chaîne JSON
}

// Fonction pour effectuer une requête POST sur /api/users/:id/followers/:depth/products
function followers() {
    const dbType = document.querySelector('select[name="db"]').value;
    const userId = document.getElementById('userId').value;
    const depth = document.getElementById('depth').value;
    const params = { userId, depth, dbType };
    const startTime = Date.now();

    fetch('/api/followers/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            depth: depth,
            dbType: dbType
        })
    })
        .then(response => response.json())
        .then(data => {
            const elapsedTime = Date.now() - startTime;

            // Mettre à jour la réponse affichée
            document.getElementById('response').innerHTML = JSON.stringify(data.products, null, 2);
            document.getElementById('time').innerText = `Temps de réponse : ${elapsedTime} ms`;

            // Mettre à jour le graphique avec le temps de la requête
            requestChart.data.labels.push(requestCount);
            requestChart.data.datasets[0].data.push(elapsedTime);
            requestChart.update();

            // Ajouter à l'historique
            addToHistory("followers", elapsedTime, dbType, params);

            // Masquer la div 'followers-fields' si la réponse est obtenue
            document.getElementById('followers-fields').style.display = 'none';

            requestCount++;
        })
        .catch(err => {
            document.getElementById('response').innerText = 'Erreur lors de la requête';
            console.error(err);
        });
}

// Fonction pour effectuer une requête POST sur /api/users/:id/followers/:depth/products
function followersProducts() {
    const dbType = document.querySelector('select[name="db"]').value;
    const userId = document.getElementById('userId-products').value;
    const depth = document.getElementById('depth-products').value;
    const productId = document.getElementById('productId').value;
    const params = { userId, depth, dbType, productId };
    const startTime = Date.now();

    fetch('/api/followers/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            depth: depth,
            dbType: dbType,
            productId: productId
        })
    })
        .then(response => response.json())
        .then(data => {
            const elapsedTime = Date.now() - startTime;

            // Mettre à jour la réponse affichée
            document.getElementById('response').innerHTML = JSON.stringify(data.products, null, 2);
            document.getElementById('time').innerText = `Temps de réponse : ${elapsedTime} ms`;

            // Mettre à jour le graphique avec le temps de la requête
            requestChart.data.labels.push(requestCount);
            requestChart.data.datasets[0].data.push(elapsedTime);
            requestChart.update();

            // Ajouter à l'historique
            addToHistory("followersProducts", elapsedTime, dbType, params);

            // Masquer la div 'followersProducts-fields' si la réponse est obtenue
            document.getElementById('followersProducts-fields').style.display = 'none';

            requestCount++;
        })
        .catch(err => {
            document.getElementById('response').innerText = 'Erreur lors de la requête';
            console.error(err);
        });
}


// Fonction pour ajouter une entrée à l'historique dans le tableau
function addToHistory(queryName, elapsedTime, dbType, params) {
    const historyTable = document.getElementById('historyTable').getElementsByTagName('tbody')[0];

    // Créer une nouvelle ligne de tableau
    const newRow = historyTable.insertRow();

    // Créer les cellules pour la ligne
    const dateCell = newRow.insertCell(0);
    const queryNameCell = newRow.insertCell(1);
    const elapsedTimeCell = newRow.insertCell(2);
    const dbTypeCell = newRow.insertCell(3);
    const paramsCell = newRow.insertCell(4);
    const actionsCell = newRow.insertCell(5); // Cellule pour le bouton

    // Ajouter les données dans les cellules
    dateCell.innerText = new Date().toLocaleString(); // Date et heure actuelles
    queryNameCell.innerText = queryName;
    elapsedTimeCell.innerText = elapsedTime;
    dbTypeCell.innerText = dbType;
    paramsCell.innerText = JSON.stringify(params); // Afficher les paramètres sous forme de chaîne JSON

    // Ajouter un bouton pour afficher les paramètres
    const showParamsButton = document.createElement('button');
    showParamsButton.innerText = 'Afficher les paramètres';
    showParamsButton.onclick = () => openParamsModal(params);
    actionsCell.appendChild(showParamsButton);
}

// Fonction pour afficher le modal avec les paramètres
function openParamsModal(params) {
    const paramsContent = document.getElementById('paramsContent');
    paramsContent.innerText = JSON.stringify(params, null, 2); // Afficher les paramètres de manière lisible
    document.getElementById('paramsModal').style.display = 'block'; // Afficher le modal
}

// Fonction pour fermer le modal
function closeParamsModal() {
    document.getElementById('paramsModal').style.display = 'none'; // Masquer le modal
}









// Fonction pour mettre à jour les champs en fonction de la base de données choisie
function updateFormFields() {
    const db = document.getElementById("db").value;
    const action = document.getElementById("action").value;
    console.log(`Base de données: ${db}, Action: ${action}`);
}

// Fonction pour afficher ou masquer le champ de saisie du nombre
function toggleQuantityField() {
    const action = document.getElementById("action").value;
    const quantityUserInput = document.getElementById("quantityUserInput");
    const quantityProductInput = document.getElementById("quantityProductInput");

    if (action === 'insert-user') {
        quantityUserInput.style.display = 'block';
        quantityProductInput.style.display = 'none';
    } else if (action === 'insert-product') {
        quantityUserInput.style.display = 'none';
        quantityProductInput.style.display = 'block';
    } else if (action === 'insert-massive') {
        quantityUserInput.style.display = 'block';
        quantityProductInput.style.display = 'block';
    } else {
        quantityUserInput.style.display = 'none';
        quantityProductInput.style.display = 'none';
    }
}


// Fonction pour gérer les actions (initialisation et insertion)
function handleAction() {
    const db = document.getElementById("db").value;
    const action = document.getElementById("action").value;
    const nbUser = document.getElementById("nbUser").value;
    const nbProduct = document.getElementById("nbProduct").value;

    let route = '';

    // Choisir la route en fonction de la base de données et de l'action
    if (action === 'init') {
        if (db === 'pgsql') {
            route = `/API/init-pgsql`;
        } else if (db === 'neo4j') {
            route = `/API/init-neo4j`;
        }
    } else if (action === 'insert-user') {
        if (db === 'pgsql') {
            route = `/API/insert-user-pgsql`;
        } else if (db === 'neo4j') {
            route = `/API/insert-user-neo4j`;
        }
    } else if (action === 'insert-product') {
        if (db === 'pgsql') {
            route = `/API/insert-product-pgsql`;
        } else if (db === 'neo4j') {
            route = `/API/insert-product-neo4j`;
        }
    } else if (action === 'insert-follower') {
        if (db === 'pgsql') {
            route = `/API/insert-follower-pgsql`;
        } else if (db === 'neo4j') {
            route = `/API/insert-follower-neo4j`;
        }
    } else if (action === 'insert-own') {
        if (db === 'pgsql') {
            route = `/API/insert-own-pgsql`;
        } else if (db === 'neo4j') {
            route = `/API/insert-own-neo4j`;
        }
    } else if (action === 'insert-massive') {
        if (db === 'pgsql') {
            route = `/API/insert-massive-pgsql`;
        } else if (db === 'neo4j') {
            route = `/API/insert-massive-neo4j`;
        }
    }

    // Construction du corps de la requête selon l'action sélectionnée
    let body = null;
    if (action === 'insert-user') {
        body = JSON.stringify({ nbUser: nbUser });
    } else if (action === 'insert-product') {
        body = JSON.stringify({ nbProduct: nbProduct });
    } else if (action === 'insert-massive') {
        body = JSON.stringify({ nbUser: nbUser, nbProduct: nbProduct });
    }

    // Envoi de la requête en fonction de l'action sélectionnée
    fetch(route, {
        method: action === 'insert-user' || action === 'insert-product' || action === 'insert-massive' ? 'POST' : 'GET',
        headers: body ? { 'Content-Type': 'application/json' } : {},
        body: body
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("initResponse").innerText = 'Opération réussie : ' + data.message;
        })
        .catch(error => {
            document.getElementById("initResponse").innerText = 'Erreur : ' + error.message;
        });

}