const assetsClient = require('./assetsClient')

async function getBalanceAll(context) {
    let { req, res } = context;
    try {
      const response = await assetsClient.getBalanceAll({gasPrice: "0"});
      res.status(200).json(response);
    } catch (error) {
      res.status(500).send(error);
    }
  }

async function getBalance(context) {
    let { req, res } = context;
    var jsonObj = {
      "id": req.query.accID,
      "points": 0
    };
    try {
      console.log('Req arg' + req.query.accID);
      const balance = await assetsClient.getBalance(req.query.accID, {gasPrice: "0"});
      jsonObj.points = balance;
      res.status(200).json(jsonObj);
    } catch (error) {
      res.status(500).send(error);
    }
  }

async function transferFunc(context) {
    let { req, res } = context;
    
    try {
      console.log('Req arg' + req.query.accID);
      const response = await assetsClient.doTransfer(req.query.accID, req.query.amt, {gasPrice: "0"});
      res.status(200).json(response);
    } catch (error) {
      res.status(500).send(error);
    }
  }

module.exports = {
  getBalanceAll,
  getBalance,
  transferFunc
  };