//getBalance/index.js

const apiObj = require('../apiAF')

module.exports = async function (context, req) {
    context.log('Request for getBalance processed.');
    console.log(req);
    await apiObj.getBalance(context, {gasPrice: "0"});
    console.log(context);
};


