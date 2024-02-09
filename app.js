async function calculateAPR() {
  try {
    const response = await fetch('/api/calculate-apr');
    const data = await response.json();

    if (data.apr) {
      document.getElementById('aprResult').textContent = data.apr.toFixed(2);
    } else {
      console.error('Error fetching APR:', data.error);
    }
  } catch (error) {
    console.error('Error fetching APR:', error);
  }
}

calculateAPR(); // Call on page load

