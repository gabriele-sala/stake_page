const Web3 = require('web3');
const infuraProjectId = 'faf348e8e5554ff0a870792631b24807'; 

const staticAddress = '0x4ab6FFa52460979DdE1E442FB95F8BaC56C3AdC3'; // Replace with the address you want to use

async function calculateAPR() {
  const web3 = new Web3('https://mainnet.infura.io/v3/' + infuraProjectId);

  try {
    // Simulate balance for static address 
    const simulatedBalanceInWei = web3.utils.toWei('1.5', 'ether'); 
    const balanceInEther = web3.utils.fromWei(simulatedBalanceInWei, 'ether');

    const apr = (2500000 / parseFloat(balanceInEther)) / 43 * 365;

    document.getElementById('aprResult').textContent = apr.toFixed(2);
  } catch (error) {
    console.error('Error calculating APR:', error);
  }
}

// Immediately calculate APR on page load
calculateAPR(); 


