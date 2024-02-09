const Web3 = require('web3');
const infuraProjectId = 'faf348e8e5554ff0a870792631b24807'; // Replace with your Infura project ID

const web3 = new Web3('https://mainnet.infura.io/v3/' + infuraProjectId);

export default async function handler(req, res) {
  try {
    const staticAddress = '0x4ab6FFa52460979DdE1E442FB95F8BaC56C3AdC3'; // Replace with your static Ethereum address
    const simulatedBalanceInWei = web3.utils.toWei('1.5', 'ether'); 
    const balanceInEther = web3.utils.fromWei(simulatedBalanceInWei, 'ether');

    const apr = (2500000 / parseFloat(balanceInEther)) / 43 * 365;

    res.status(200).json({ apr });
  } catch (error) {
    console.error('Error calculating APR:', error);
    res.status(500).json({ error: 'Failed to calculate APR' });
  }
}

