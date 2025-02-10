// Initialisation du graphique avec Chart.js
const ctx = document.getElementById('requestChart').getContext('2d');


// Variable pour suivre le numéro de la requête
window.requestCount = 0; // Rend requestCount accessible globalement
window.actionsList = [];


window.requestChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temps de requête (ms)',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        }]
    },
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        let index = tooltipItems[0].dataIndex; // Récupère l'index du point
                        let action = window.actionsList?.[index] || "Action inconnue"; // Récupère l'action correspondante
                        return `Requête #${index + 1} - ${action}`; // Affiche dans le titre
                    },
                    label: function (tooltipItem) {
                        return `Temps: ${tooltipItem.raw} ms`;
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: { display: true, text: 'Numéro de requête' }
            },
            y: {
                title: { display: true, text: 'Temps (ms)' },
                min: 0,
            }
        }
    }
});
