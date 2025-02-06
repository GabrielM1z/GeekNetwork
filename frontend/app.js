function fetchData() {
    const dbType = document.querySelector('input[name="db"]:checked').value;
    const startTime = Date.now();
    fetch(`http://localhost:5000/api/users?db=${dbType}`)
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
