const Web3 = require('web3');
const infuraProjectId = 'faf348e8e5554ff0a870792631b24807'; // Replace with your Infura Project ID

// Static Ethereum address
const staticAddress = '0x4ab6FFa52460979DdE1E442FB95F8BaC56C3AdC3'; // Replace with the actual address you want to use

async function calculateAPR() {
  // Connect to an Ethereum node 
  const web3 = new Web3('https://mainnet.infura.io/v3/' + infuraProjectId);

  try {
    // Simulate balance for static address (adjust as needed)
    const simulatedBalanceInWei = web3.utils.toWei('1.5', 'ether'); 

    const balanceInEther = web3.utils.fromWei(simulatedBalanceInWei, 'ether');

    const apr = (2500000 / parseFloat(balanceInEther)) / 43 * 365;

    document.getElementById('aprResult').textContent = apr.toFixed(2);
  } catch (error) {
    console.error('Error calculating APR:', error);
    alert('An error occurred. Please check your Infura Project ID and try again.');
  }
}

document.getElementById('calculateButton').addEventListener('click', calculateAPR);

