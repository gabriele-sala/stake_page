const Web3 = require('web3');
const BigNumber = require('bignumber.js'); 

// Use an actual provider you trust if necessary beyond Public Node - for testing it suffices 
const mainnetProvider = 'https://rpc.publicnode.com'; 
const infuraProvider = 'https://mainnet.infura.io/v3/faf348e8e5554ff0a870792631b24807'; // For fallback, use REAL Infura key/url 

const web3 = new Web3(new Web3.providers.HttpProvider(mainnetProvider)); 

//  YOUR TOKEN CONTRACT (Paste in ABI)
const tokenContractAddress = '0x940a2dB1B7008B6C776d4faaCa729d6d4A4AA551'; // REPLACE WITH YOUR CONTRACT ADDRESS!
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
const userAddress = '0x4ab6FFa52460979DdE1E442FB95F8BaC56C3AdC3'; // REPLACE WITH THE ADDRESS TO QUERY!

module.exports = async (req, res) => {
  try {
    const contract = new web3.eth.Contract(tokenABI, tokenContractAddress);

    const rawBalance = await contract.methods.balanceOf(userAddress).call();
    const balance = new BigNumber(rawBalance.toString());
    const tokenDecimals = await contract.methods.decimals().call(); 
    const adjustedBalance = balance.div(10 ** tokenDecimals).toString(); 

    res.status(200).json({ balance: adjustedBalance });  
  } catch (error) {
    // Provider Switching Logic If Error  
    console.error('Main provider issue:', error);

    //  Infura Fallback Attempt
    web3.setProvider(infuraProvider); // Fallback 
    //  Optional - retry your contract calls on new provider...

    res.status(500).json({ error: 'Failed to fetch token balance', details: error









