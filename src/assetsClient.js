const contract = require('truffle-contract');
const Web3 = require('web3');
const path = require('path');
const jsonfile = require("jsonfile");

var contractPath;

contractPath = path.join(__dirname, '../truffle/build/contracts/EYCoin.json');

var erc20JSON = require(contractPath);
//console.log(erc20JSON);

var provider = new Web3.providers.HttpProvider("https://pcmem1.blockchain.azure.com:3200/fFAw25mr7QctChlP3FTSKP6Q");
var web3 = new Web3(provider);

var erc20Contract = contract(erc20JSON);
erc20Contract.setProvider(provider);

(async () => {

    web3.eth.getAccounts().then(address => {
        coinbase = address[0];
        web3.eth.defaultAccount = coinbase;
    });

    //erc20Instance = await erc20Contract.deployed();
    erc20Instance = await erc20Contract.at("0xCe31e93985640CEaae42B797528c80f580D19745");
    erc20InstanceAddress = erc20Instance.address;

    console.log('Connected to EYCoin contract at ');
    console.log(erc20InstanceAddress);
})().catch(err => {
    console.error('Failed to connect to EYCoin contract.');
    console.error(err);
});

module.exports = {
    getBalance: async(accId) => {
        acc = (await web3.eth.getAccounts())[accId];
        console.log(acc);
        try {
            //check balance
            let balance = Number(await erc20Instance.balanceOf(acc));
            return Promise.resolve(balance);
        }catch(e){
            return Promise.reject(e);
        }
    },

    doTransfer: async(accId, amt) => {
        acc = (await web3.eth.getAccounts())[accId];
        console.log("Transfer from " + web3.eth.defaultAccount + " to " + acc);
        try {
            //check balance
            let res = Number(await erc20Instance.transfer(acc, amt, {from: web3.eth.defaultAccount}));
            return Promise.resolve(res);
        }catch(e){
            return Promise.reject(e);
        }
    }
}

