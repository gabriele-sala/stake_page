async function calculateAPR() {
  try {
    const response = await fetch('/api/calculate-apr'); 
    const data = await response.json();

    if (data.apr) {
      document.getElementById('aprResult').textContent = data.apr.toFixed(2);
    } else {
      displayError(data.error || 'Failed to calculate APR'); 
    }
  } catch (error) { 
    displayError('Error fetching APR, please try again later.');
  }
}

function displayError(message) {
  document.getElementById('error-message').textContent = message;
}

calculateAPR(); // Call on page load 

