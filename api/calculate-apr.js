const Web3 = require('web3');

// Replace 'YOUR_INFURA_PROJECT_ID' with your actual Infura project ID
const infuraProjectId = 'faf348e8e5554ff0a870792631b24807';
const infuraUrl = `https://mainnet.infura.io/v3/faf348e8e5554ff0a870792631b24807`;
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

// ERC-20 Token Contract details
const tokenContractAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // Token contract address
const tokenABI = [
  // ABI provided for the ERC-20 token contract
  {"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
  {"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
  {"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
  {"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
  {"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},
  {"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
  {"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
  {"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
  {"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
  {"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
  {"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
  {"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},
  {"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}
];

// Address to query the token balance for
const userAddress = '0xB1C33b391C2569B737eC387E731E88589e8ec148'; // Replace with the address you want to check the balance of

module.exports = async (req, res) => {
    try {
        // Initialize contract with Web3
        const contract = new web3.eth.Contract(tokenABI, tokenContractAddress);

        // Fetch the token balance
        const balance = await contract.methods.balanceOf(userAddress).call();

        // Respond with the token balance
        res.status(200).json({ balance });
    } catch (error) {
        // Log and respond with an error if fetching the balance fails
        console.error('Error fetching token balance:', error);
        res.status(500).json({ error: 'Failed to fetch token balance', details: error.message });
    }
};

