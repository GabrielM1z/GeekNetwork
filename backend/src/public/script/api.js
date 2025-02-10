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

            // Mettre à jour la réponse affichée
            document.getElementById('response').innerHTML = JSON.stringify(data.products, null, 2);

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
export function followersProducts() {
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