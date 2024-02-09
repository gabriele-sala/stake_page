const Web3 = require('web3');

// Replace 'YOUR_INFURA_PROJECT_ID' with your actual Infura project ID
const infuraProjectId = 'faf348e8e5554ff0a870792631b24807';
const infuraUrl = `https://mainnet.infura.io/v3/faf348e8e5554ff0a870792631b24807`;

// Initialize a web3 instance with the Infura URL
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

// Ensure 'YOUR_ETHEREUM_ADDRESS' is replaced with the Ethereum address you're interested in
const staticAddress = '0x4ab6FFa52460979DdE1E442FB95F8BaC56C3AdC3';

module.exports = async (req, res) => {
    try {
        // Fetch the balance of the Ethereum address in Wei
        const balanceInWei = await web3.eth.getBalance(staticAddress);
        // Convert the balance from Wei to Ether
        const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');

        // Prevent division by zero or handling for very small balances
        if (parseFloat(balanceInEther) === 0) {
            return res.status(200).json({ apr: "N/A - Zero balance" });
        }

        // Calculate APR using the provided formula
        const apr = (2500000 / parseFloat(balanceInEther)) / 43 * 365;
        
        // Check for Infinity result from division by a very small number
        if (!isFinite(apr)) {
            return res.status(200).json({ apr: "N/A - Balance too low for meaningful APR" });
        }

        // Respond with the APR value, formatted to two decimal places
        res.status(200).json({ apr: `${apr.toFixed(2)}%` });
    } catch (error) {
        // Log the error and respond with a 500 status code and the error message
        console.error('Error calculating APR:', error);
        res.status(500).json({ error: 'Failed to calculate APR', details: error.message });
    }
};


