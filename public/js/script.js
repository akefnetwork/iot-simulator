document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('settingsForm');
    const feedback = document.getElementById('feedback');
    const fillingLevelInput = document.getElementById('fillingLevel');
    const increaseButton = document.getElementById('increase');
    const decreaseButton = document.getElementById('decrease');

    // Increase fill level
    increaseButton.addEventListener('click', function() {
        let fillingLevel = parseFloat(fillingLevelInput.value);
        if (fillingLevel < 1.00) {
            fillingLevel += 0.01;
            fillingLevelInput.value = fillingLevel.toFixed(2);
        }
    });

    // Decrease fill level
    decreaseButton.addEventListener('click', function() {
        let fillingLevel = parseFloat(fillingLevelInput.value);
        if (fillingLevel > 0.00) {
            fillingLevel -= 0.01;
            fillingLevelInput.value = fillingLevel.toFixed(2);
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);

        fetch('/api/index.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                feedback.innerHTML = '<div class="alert alert-success">Settings updated successfully!</div>';
            } else {
                // Assuming the server provides a message in the data object
                feedback.innerHTML = `<div class="alert alert-danger">Failed to update settings: ${data.message}</div>`;
            }
        })
        .catch(error => {
            // This will catch network errors and errors thrown from the response handling block
            feedback.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
        });
    });
});
