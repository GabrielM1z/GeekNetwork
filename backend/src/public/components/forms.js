export function toggleQuantityField() {
    const action = document.getElementById("action").value;
    document.getElementById("quantityUserInput").classList.toggle("hidden", action !== 'insert-user' && action !== 'insert-massive');
    document.getElementById("quantityProductInput").classList.toggle("hidden", action !== 'insert-product' && action !== 'insert-massive');
}

/*
export function handleFormSubmission(route, body) {
    fetch(route, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("initResponse").innerText = 'Opération réussie : ' + data.message;
        })
        .catch(error => {
            document.getElementById("initResponse").innerText = 'Erreur : ' + error.message;
        });
}
// Fonction pour mettre à jour les champs en fonction de la base de données choisie
export function updateFormFields() {
    const db = document.getElementById("db").value;
    const action = document.getElementById("action").value;
    console.log(`Base de données: ${db}, Action: ${action}`);
}

*/