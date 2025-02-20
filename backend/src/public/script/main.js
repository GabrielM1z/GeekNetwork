//import { initSql, initNoSql, followers, followersProducts } from "./api.js";
import { getTopElements, followers, followersProducts } from "./api.js";
import { toggleInitField, toggleQuantityField, toggleClassicField, toggleFollowersFields, toggleFollowersProductsFields, handleAction } from "./ui.js";
//import { toggleQuantityField } from "../components/forms.js";
import { closeParamsModal, addToHistory, closeData } from "../components/history.js";
import "./charts.js";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("InitButton").addEventListener("click", toggleInitField);
    document.getElementById("action").addEventListener("change", toggleQuantityField);
    document.getElementById("initButton").addEventListener("click", handleAction);
    document.getElementById("classicButton").addEventListener("click", toggleClassicField);
    document.getElementById("followersButton").addEventListener("click", toggleFollowersFields);
    document.getElementById("followersProductsButton").addEventListener("click", toggleFollowersProductsFields);
    document.getElementById("classic-search").addEventListener("click", getTopElements);
    document.getElementById("followers-search").addEventListener("click", followers);
    document.getElementById("followersProducts-search").addEventListener("click", followersProducts);
    document.getElementById("close_param").addEventListener("click", closeParamsModal);
    document.getElementById("close_data").addEventListener("click", closeData);
});

// Sélectionne l'élément #time
const timeElement = document.getElementById('return');

// Crée un observateur pour détecter les changements dans le contenu de #time
const observer = new MutationObserver(function (mutationsList, observer) {
    // Si le contenu change, ajoute la classe "visible"
    timeElement.classList.add('visible');
});

// Configurer l'observateur pour surveiller les changements dans le texte (nœud de texte) de l'élément
observer.observe(timeElement, {
    childList: true,    // Surveiller l'ajout ou suppression de nœuds enfants
    subtree: true,      // Surveiller aussi les sous-éléments
    characterData: true // Surveiller les changements dans le texte
});


export function trace_requete(title, time, db, body, data) {
    time = time / 1000;
    time = time.toFixed(3);

    document.getElementById('time').innerText = `Temps de réponse : ${time} s`;
    addToHistory(title, time, db, body, data)

    // Mettre à jour le graphique avec le temps de la requête
    if (window.requestChart) { // <-- Utilise `window.requestChart`
        window.requestCount++;
        window.requestChart.data.labels.push(requestCount);
        window.actionsList.push(title); // Stocke chaque action dans la liste
        window.requestChart.data.datasets[0].data.push(time);
        window.requestChart.update();
    } else {
        console.error("requestChart est undefined !");
    }
}