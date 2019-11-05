//transferFunc/index.js

const apiObj = require('../apiAF')

module.exports = async function (context, req) {
    context.log('Request for transferFunc processed.');
    //console.log(req);
    await apiObj.transferFunc(context, {gasPrice: "0"});
    console.log(context);
};


