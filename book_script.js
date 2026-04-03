const votes = {
    "Project Hail Mary": 12,
    "Babel": 8,
    "Attack on Titan": 15,
    "A Stepmother's Marchen": 6
};

const form = document.getElementById("bookForm");
const results = document.getElementById("results");
const ctx = document.getElementById("chart").getContext("2d");

let chart; // will hold the chart instance

// creates the bar chart based on current votes
function renderChart() {
    const labels = Object.keys(votes);
    const data = Object.values(votes);
    const barColors = ["green", "black","red","pink"];


    // destroy old chart before creating new one
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Votes",
                data: data,
                backgroundColor: barColors
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// action to take user clicks on submit button
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const selected = document.querySelector('input[name="favoriteBook"]:checked');
    if (!selected) {
        alert("Please choose a book.");
        return;
    }

    votes[selected.value] += 1;

    results.style.display = "block";
    renderChart();
});

// initial render
renderChart();