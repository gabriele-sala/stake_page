const Web3 = require('web3');

// Replace with your actual Infura Project ID
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'); 

async function calculateAPR() {
  const addressInput = document.getElementById('addressInput').value;

  try {
    const balance = await web3.eth.getBalance(addressInput);
    const balanceInEther = web3.utils.fromWei(balance, 'ether');

    const apr = (2500000 / parseFloat(balanceInEther)) / 43 * 365;

    document.getElementById('aprResult').textContent = apr.toFixed(2); 
  } catch (error) {
    console.error('Error fetching or calculating:', error);
    alert('An error occurred. Please check the address and try again.');
  }
}

document.getElementById('calculateButton').addEventListener('click', calculateAPR);


};
