// Fonction pour effectuer une requête sur /api/users
function user() {
    const dbType = document.querySelector('input[name="db"]:checked').value;
    const startTime = Date.now();

    fetch(`/api/users?db=${dbType}`)
        .then(response => response.json())
        .then(data => {
            const elapsedTime = Date.now() - startTime;
            document.getElementById('response').innerHTML = JSON.stringify(data.users, null, 2);
            document.getElementById('time').innerText = `Temps de réponse : ${elapsedTime} ms`;
        })
        .catch(err => {
            document.getElementById('response').innerText = 'Erreur lors de la requête';
            console.error(err);
        });
}

// Fonction pour effectuer une requête sur /api/users/:id/purchases
function purchases() {
    const dbType = document.querySelector('input[name="db"]:checked').value;
    const userId = prompt("Entrez l'ID de l'utilisateur:");
    const startTime = Date.now();

    fetch(`/api/purchases/${userId}?db=${dbType}`)
        .then(response => response.json())
        .then(data => {
            const elapsedTime = Date.now() - startTime;
            document.getElementById('response').innerHTML = JSON.stringify(data.purchases, null, 2);
            document.getElementById('time').innerText = `Temps de réponse : ${elapsedTime} ms`;
        })
        .catch(err => {
            document.getElementById('response').innerText = 'Erreur lors de la requête';
            console.error(err);
        });
}

// Fonction pour effectuer une requête sur /api/users/:id/followers/:depth/products
function followersProducts() {
    const dbType = document.querySelector('input[name="db"]:checked').value;
    const userId = prompt("Entrez l'ID de l'utilisateur:");
    const depth = prompt("Entrez la profondeur des followers:");
    const startTime = Date.now();

    fetch(`/api/followers/${userId}/${depth}?db=${dbType}`)
        .then(response => response.json())
        .then(data => {
            const elapsedTime = Date.now() - startTime;
            document.getElementById('response').innerHTML = JSON.stringify(data.products, null, 2);
            document.getElementById('time').innerText = `Temps de réponse : ${elapsedTime} ms`;
        })
        .catch(err => {
            document.getElementById('response').innerText = 'Erreur lors de la requête';
            console.error(err);
        });
}

// Fonction pour effectuer une requête sur /api/products/:id/impact
function productImpact() {
    const dbType = document.querySelector('input[name="db"]:checked').value;
    const productId = prompt("Entrez l'ID du produit:");
    const startTime = Date.now();

    fetch(`/api/products/${productId}/impact?db=${dbType}`)
        .then(response => response.json())
        .then(data => {
            const elapsedTime = Date.now() - startTime;
            document.getElementById('response').innerHTML = JSON.stringify(data.impact, null, 2);
            document.getElementById('time').innerText = `Temps de réponse : ${elapsedTime} ms`;
        })
        .catch(err => {
            document.getElementById('response').innerText = 'Erreur lors de la requête';
            console.error(err);
        });
}

// Fonction pour effectuer une requête sur /api/products/trending
function trendingProducts() {
    const dbType = document.querySelector('input[name="db"]:checked').value;
    const startTime = Date.now();

    fetch(`/api/products/trending?db=${dbType}`)
        .then(response => response.json())
        .then(data => {
            const elapsedTime = Date.now() - startTime;
            document.getElementById('response').innerHTML = JSON.stringify(data.products, null, 2);
            document.getElementById('time').innerText = `Temps de réponse : ${elapsedTime} ms`;
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
            alert(data.message);  // Affiche le message de succès
        })
        .catch(err => {
            alert('Erreur lors de l\'initialisation de PostgreSQL');
            console.error(err);
        });
}

// Fonction pour initialiser Neo4j
function initNoSql() {
    fetch('http://localhost:5000/API/INIT-neo4j')
        .then(response => response.json())
        .then(data => {
            alert(data.message);  // Affiche le message de succès
        })
        .catch(err => {
            alert('Erreur lors de l\'initialisation de Neo4j');
            console.error(err);
        });
}
