const EYCoin = artifacts.require("EYCoin");

module.exports = function(deployer) {
  console.log('Deploying EYCoin');
  //console.log(web3.eth.accounts[0]);
  var defAcct = '0x4e37b46d8c31325c51986f142ca0e9e7a213936a';
  // Name, Symbol, Decimal
  deployer.deploy(EYCoin, "EYCoin", "EYC", 0, defAcct, web3.utils.toWei('1000000000', 'ether'), {from:defAcct});
};