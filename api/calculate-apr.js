const Web3 = require('web3');

// Replace 'YOUR_INFURA_PROJECT_ID' with your actual Infura project ID
const infuraProjectId = 'faf348e8e5554ff0a870792631b24807';
const infuraUrl = `https://mainnet.infura.io/v3/faf348e8e5554ff0a870792631b24807`;
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

// ERC-20 Token Contract details
const tokenContractAddress = '0x940a2dB1B7008B6C776d4faaCa729d6d4A4AA551'; // Replace with your token's contract address
const tokenABI = [
  // Minimal ABI to get ERC20 Token balance
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "type": "function"
  },
];

// Address to query the token balance for
const userAddress = '0x4ab6FFa52460979DdE1E442FB95F8BaC56C3AdC3'; // Replace with the address you want to check the balance of

module.exports = async (req, res) => {
    try {
        // Initialize contract with Web3
        const contract = new web3.eth.Contract(tokenABI, tokenContractAddress);

        // Fetch the token balance
        const balance = await contract.methods.balanceOf(userAddress).call();

        // Convert balance to a readable format if necessary (depending on the token's decimals)
        const decimals = 18; // This is common, but check your token's actual decimals
        const balanceInTokens = balance / Math.pow(10, decimals);

        // Respond with the token balance
        res.status(200).json({ balance: balanceInTokens });
    } catch (error) {
        // Log and respond with an error if fetching the balance fails
        console.error('Error fetching token balance:', error);
        res.status(500).json({ error: 'Failed to fetch token balance', details: error.message });
    }
};



