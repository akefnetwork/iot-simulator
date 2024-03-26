document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('settingsForm');
    const feedback = document.getElementById('feedback');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch('/api/index.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            feedback.innerHTML = '<p class="success">Settings updated successfully!</p>';
        })
        .catch(error => {
            feedback.innerHTML = '<p class="error">Error updating settings.</p>';
            console.error('Error:', error);
        });
    });
});
