const Web3 = require('web3');
const alchemyApiKey = 'https://eth-mainnet.g.alchemy.com/v2/cdHgNpLVB-LMgKyXNu7SokVnkhMQrvr4'; // Replace with YOUR Alchemy API key

const web3 = new Web3(new Web3.providers.HttpProvider(alchemyApiKey));

// ERC-20 Token Contract details 
const tokenContractAddress = '0x940a2dB1B7008B6C776d4faaCa729d6d4A4AA551'; 
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
const userAddress = '0x4ab6FFa52460979DdE1E442FB95F8BaC56C3AdC3'; 

module.exports = async (req, res) => {
  try {
    // Initialize contract 
    const contract = new web3.eth.Contract(tokenABI, tokenContractAddress);

    // Fetch the token balance using the 'balanceOf' method
    const balance = await contract.methods.balanceOf(userAddress).call();

    // Handle decimals of the token
    const tokenDecimals = await contract.methods.decimals().call(); 
    const adjustedBalance = balance / (10 ** tokenDecimals); 

    // Respond with the token balance
    res.status(200).json({ balance: adjustedBalance });  
  } catch (error) {
    // Log and respond with an error if fetching the balance fails
    console.error('Error fetching token balance:', error);
    res.status(500).json({ error: 'Failed to fetch token balance', details: error.message });
  }
};


