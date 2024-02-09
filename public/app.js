document.addEventListener('DOMContentLoaded', function() {
    calculateAPR(); // Call when the DOM is fully loaded
});

function calculateAPR() {
    fetch('/api/calculate-apr') // Makes a request to the serverless function
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayAPR(data.apr); // Display the APR result
        })
        .catch(error => {
            console.error('Failed to fetch APR:', error);
            displayError('Failed to calculate APR. Please try again later.');
        });
}

function displayAPR(apr) {
    const aprElement = document.getElementById('aprResult');
    if (aprElement) {
        aprElement.textContent = `${apr}%`; // Update the text content with the APR
    }
}

function displayError(message) {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = message; // Display the error message
    }
}


