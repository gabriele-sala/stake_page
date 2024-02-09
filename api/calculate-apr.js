// calculate-apr.js
async function calculateAPR(web3) {
  const staticAddress = '0x4ab6FFa52460979DdE1E442FB95F8BaC56C3AdC3'; // Replace with your Ethereum address

  try {
    // Fetch the balance of the Ethereum address
    const balanceInWei = await web3.eth.getBalance(staticAddress);
    const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');

    // Apply the APR calculation formula
    const apr = (2500000 / parseFloat(balanceInEther)) / 43 * 365;
    
    return apr.toFixed(2); // Return APR rounded to two decimal places
  } catch (error) {
    console.error('Error in calculateAPR:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

module.exports = { calculateAPR };
