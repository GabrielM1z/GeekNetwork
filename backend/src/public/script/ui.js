import { addToHistory } from "../components/history.js";
import "./charts.js";


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
export function handleAction() {
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

    const elapsedTime = Math.floor(Math.random() * 1001);

    addToHistory(action, elapsedTime, db, body)

    // Mettre à jour le graphique avec le temps de la requête
    if (window.requestChart) { // <-- Utilise `window.requestChart`
        window.requestCount++;
        window.requestChart.data.labels.push(requestCount);
        //window.requestChart.data.title.push("Requête #" + requestCount + " - " + action);
        window.lastAction = action; // ✅ Sauvegarde la dernière action

        window.requestChart.data.datasets[0].data.push(elapsedTime);
        window.requestChart.update();
    } else {
        console.error("requestChart est toujours undefined !");
    }


}