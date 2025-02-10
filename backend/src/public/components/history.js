// Fonction pour ajouter une entrée à l'historique dans le tableau
export function addToHistory(queryName, elapsedTime, dbType, params) {
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
export function openParamsModal(params) {
    const paramsContent = document.getElementById('paramsContent');
    paramsContent.innerText = JSON.stringify(params, null, 2); // Afficher les paramètres de manière lisible
    document.getElementById('paramsModal').style.display = 'block'; // Afficher le modal
}

// Fonction pour fermer le modal
export function closeParamsModal() {
    document.getElementById('paramsModal').style.display = 'none'; // Masquer le modal
}
