//getBalanceAll/index.js

const apiObj = require('../apiAF')

module.exports = async function (context, req) {
    context.log('Request for getBalanceAll processed.');

    await apiObj.getBalanceAll(context, {gasPrice: "0"});
    console.log(context);
};


