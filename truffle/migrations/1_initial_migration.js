const EYCoin = artifacts.require("EYCoin");

module.exports = function(deployer) {
  console.log('Deploying EYCoin');
  //console.log(web3.eth.accounts[0]);
  var defAcct = '0xef8a373147679b64bfa6a31133b45666cb9b553e';
  // Name, Symbol, Decimal
  deployer.deploy(EYCoin, "EYCoin", "EYC", 0, defAcct, web3.utils.toWei('1000000000', 'ether'), {from:defAcct});
};
