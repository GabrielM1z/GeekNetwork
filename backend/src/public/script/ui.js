import "./charts.js";
import { trace_requete } from "./main.js";

// Fonction pour afficher/masquer les requetes classiques
export function toggleInitField() {
    const fields = document.getElementById('Initialiser');
    fields.style.display = (fields.style.display === 'none' || fields.style.display === '') ? 'block' : 'none';
}

// Fonction pour afficher/masquer les nombres de user et product
export function toggleQuantityField() {
    const action = document.getElementById("action").value;
    document.getElementById("quantityUserInput").classList.toggle("hidden", action !== 'insert-user' && action !== 'insert-massive');
    document.getElementById("quantityProductInput").classList.toggle("hidden", action !== 'insert-product' && action !== 'insert-massive');
}

// Fonction pour afficher/masquer les requetes classiques
export function toggleClassicField() {
    const fields = document.getElementById('classic-fields');
    fields.style.display = (fields.style.display === 'none' || fields.style.display === '') ? 'block' : 'none';
}

// Fonction pour afficher/masquer les champs de la requête followers
export function toggleFollowersFields() {
    const fields = document.getElementById('followers-fields');
    fields.style.display = (fields.style.display === 'none' || fields.style.display === '') ? 'block' : 'none';
}

// Fonction pour afficher/masquer les champs de la requête followersProducts
export function toggleFollowersProductsFields() {
    const fields = document.getElementById('followersProducts-fields');
    fields.style.display = (fields.style.display === 'none' || fields.style.display === '') ? 'block' : 'none';
}

// Fonction pour gérer les actions (initialisation et insertion)
export async function handleAction() {
    const db = document.getElementById("db").value;
    const action = document.getElementById("action").value;
    const nbUser = document.getElementById("nbUser").value;
    const nbProduct = document.getElementById("nbProduct").value;
    let time = 0
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

    document.getElementById('loading-overlay').style.display = 'block';

    // Envoi de la requête en fonction de l'action sélectionnée
    await fetch(route, {
        method: action === 'insert-user' || action === 'insert-product' || action === 'insert-massive' ? 'POST' : 'GET',
        headers: body ? { 'Content-Type': 'application/json' } : {},
        body: body
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading-overlay').style.display = 'none';
            document.getElementById("response").innerText = '✅ Opération réussie : ' + data.response;
            time = data.response_time
        })
        .catch(error => {
            document.getElementById('loading-overlay').style.display = 'none';
            document.getElementById("response").innerText = '❌ Erreur : ' + error.response;
        });
    trace_requete(action, time, db, body, null)
}

export function tableChange() {
    const selectedValue = document.getElementById("table").value;
    const limitLabel = document.getElementById("limitLabel");
    const limitInput = document.getElementById("limit");

    if (selectedValue === "Count") {
        limitLabel.style.display = "none";
        limitInput.style.display = "none";
    } else {
        limitLabel.style.display = "inline";
        limitInput.style.display = "inline";
    }
}