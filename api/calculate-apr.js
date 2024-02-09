const Web3 = require('web3');

// Ensure you replace '0x...' with the actual Ethereum address you're interested in
const staticAddress = '0x4ab6FFa52460979DdE1E442FB95F8BaC56C3AdC3';

// Replace 'your_infura_project_id_here' with the actual environment variable key if different
const infuraUrl = `https://mainnet.infura.io/v3/faf348e8e5554ff0a870792631b24807`;

module.exports = async (req, res) => {
    try {
        // Initialize a web3 instance with the Infura URL
        const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

        // Fetch the balance of the Ethereum address in Wei
        const balanceInWei = await web3.eth.getBalance(staticAddress);

        // Convert the balance from Wei to Ether
        const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');

        // Calculate APR using the provided formula
        // Ensure the formula calculation is correct and adjust according to your logic if necessary
        const apr = (2500000 / parseFloat(balanceInEther)) / 43 * 365;

        // Respond with the APR value, formatted to two decimal places
        res.status(200).json({ apr: `${apr.toFixed(2)}%` });
    } catch (error) {
        // Log the error and respond with a 500 status code and the error message
        console.error('Error calculating APR:', error);
        res.status(500).json({ error: 'Failed to calculate APR', details: error.message });
    }
};

