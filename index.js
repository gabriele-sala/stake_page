require('dotenv').config(); // Load environment variables
const express = require('express');
const Web3 = require('web3');
const app = express();
const port = 3000;

const infuraProjectId = process.env.INFURA_PROJECT_ID;
const web3 = new Web3(`https://mainnet.infura.io/v3/${infuraProjectId}`);

app.use(express.static('public')); // Serve static files

app.get('/api/calculate-apr', async (req, res) => {
  try {
    const staticAddress = '0x4ab6FFa52460979DdE1E442FB95F8BaC56C3AdC3'; // Example Ethereum address
    const simulatedBalanceInWei = web3.utils.toWei('1.5', 'ether');
    const balanceInEther = web3.utils.fromWei(simulatedBalanceInWei, 'ether');

    const apr = (2500000 / parseFloat(balanceInEther)) / 43 * 365; // Example APR calculation
    res.status(200).json({ apr: `${apr.toFixed(2)}%` });
  } catch (error) {
    console.error('Error calculating APR:', error);
    res.status(500).json({ error: 'Failed to calculate APR' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

