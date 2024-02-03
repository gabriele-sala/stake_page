// index.js

const ethers = require('ethers'); 

const apiKey = 'YOUR_ETHERSCAN_API_KEY';

const provider = new ethers.providers.EtherscanProvider('mainnet', apiKey);

const contractAddress = '0x4ab6ffa52460979dde1e442fb95f8bac56c3adc3';

const contractAbi = [
  // Paste ABI here
];

const contract = new ethers.Contract(contractAddress, contractAbi, provider);

exports.handler = async function(event) {

  let {address} = event.queryStringParameters;

  // Get user's staked balance
  let balance = await contract.balanceOf(address);
  
  // Get total staked in contract
  let totalStaked = await contract.totalStaked(); 
  
  // Calculate APR
  let apr = 2500000 / totalStaked * 365 / 44;

  return {
    statusCode: 200,
    body: JSON.stringify({
      address,
      balance,
      totalStaked,
      apr
    })
  }

}
