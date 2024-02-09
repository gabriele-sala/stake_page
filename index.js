require('dotenv').config();
const express = require('express');
const Web3 = require('web3');
const { calculateAPR } = require('./api/calculate-apr'); // Adjust the path as necessary
const app = express();
const port = 3000;

const infuraProjectId = process.env.INFURA_PROJECT_ID;
const web3 = new Web3(`https://mainnet.infura.io/v3/${infuraProjectId}`);

app.use(express.static('public')); // Serve static files

app.get('/api/calculate-apr', async (req, res) => {
  try {
    const apr = await calculateAPR(web3); // Pass the web3 instance
    res.status(200).json({ apr: `${apr}%` }); // Send APR as a string with a "%" sign
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to calculate APR' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

