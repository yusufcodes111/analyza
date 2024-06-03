document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("numberForm");
    const inputFields = document.getElementById("input-fields");
    const resultSection = document.getElementById("result-section");

    // Generate input fields for 10 sets of 35 numbers
    for (let i = 0; i < 10; i++) {
        let div = document.createElement("div");
        div.innerHTML = `<div>Set ${i + 1}:</div>`;
        for (let j = 0; j < 35; j++) {
            div.innerHTML += `<input type="number" name="set${i}num${j}" min="1" max="48" required> `;
            if ((j + 1) % 7 === 0) div.innerHTML += '<br>';
        }
        div.innerHTML += '<br><br>';
        inputFields.appendChild(div);
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let formData = new FormData(form);

        fetch('predict.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            displayTable(data.enteredSets, "Entered Sets of Numbers");
            displayTable(data.predictedSets, "Predicted Sets of Numbers");
        })
        .catch(error => console.error('Error:', error));
    });

    function displayTable(sets, title) {
        let tableHtml = `<h2>${title}</h2><table border="1" cellpadding="5" cellspacing="0">`;
        sets.forEach(set => {
            tableHtml += '<tr>';
            set.forEach(number => {
                tableHtml += `<td>${number}</td>`;
            });
            tableHtml += '</tr>';
        });
        tableHtml += '</table>';
        resultSection.innerHTML += tableHtml;
    }
});
