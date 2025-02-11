import { trace_requete } from "./main.js";

// Fonction pour effectuer une requête POST sur /api/users/:id/followers/:depth/products
export function getTopElements() {
    const dbType = document.querySelector('select[name="db"]').value;
    const table = document.getElementById('table').value;  // Table (User, Product, etc.)
    const limit = document.getElementById('limit').value;  // Nombre N d'éléments à récupérer
    const params = { table, limit, dbType };
    console.log("param=", params)
    fetch('/api/top-elements', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            table: table,
            limit: limit,
            dbType: dbType
        })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("response").innerText = '✅ Opération réussie : ' + data.response;
            trace_requete("Requete n°0", data.response_time, dbType, params, data.data)
        })
        .catch(err => {
            document.getElementById('response').innerText = '❌ Erreur lors de la requête';
            console.error(err);
        });
}


// Fonction pour effectuer une requête POST sur /api/users/:id/followers/:depth/products
export function followers() {
    const dbType = document.querySelector('select[name="db"]').value;
    const userId = document.getElementById('userId').value;
    const depth = document.getElementById('depth').value;
    const params = { userId, depth, dbType };

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
            document.getElementById("response").innerText = '✅ Opération réussie : ' + data.response;
            trace_requete("Requete n°1", data.response_time, dbType, params, data.data)
        })
        .catch(err => {
            document.getElementById('response').innerText = '❌ Erreur lors de la requête';
            console.error(err);
        });
}

// Fonction pour effectuer une requête POST sur /api/users/:id/followers/:depth/products
export function followersProducts() {
    const dbType = document.querySelector('select[name="db"]').value;
    const userId = document.getElementById('userId-products').value;
    const depth = document.getElementById('depth-products').value;
    const productId = document.getElementById('productId').value;
    const params = { userId, depth, dbType, productId };
    console.log("param=", params)
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
            document.getElementById("response").innerText = '✅ Opération réussie : ' + data.response;
            trace_requete("Requete n°2", data.response_time, dbType, params, data.data)
        })
        .catch(err => {
            document.getElementById('response').innerText = '❌ Erreur lors de la requête';
            console.error(err);
        });
}