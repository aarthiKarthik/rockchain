const Response = require('./config/index');
const logger = require('./config/logger');
const assetsClient = require('./assetsClient')

let init = (router) => {

    router.route('/getBalance/:accID')
        .get(async (req, res) => {
            let response;
            try {
                response = await assetsClient.getBalance(req.params.accID, {gasPrice: "0"});
                console.log(req.params.accID);
                res.status(200).json(response);
            } catch (e) {
                logger.error("API Gateway : getBalance : e = " + e);
                response = new Response(500, "Error in get balance call", {}, e);
                res.status(response.code).json(response);
            }
        })

    router.route('/getBalanceAll/')
        .get(async (req, res) => {
            let response;
            try {
                response = await assetsClient.getBalanceAll({gasPrice: "0"});
                console.log(req.params.accID);
                res.status(200).json(response);
            } catch (e) {
                logger.error("API Gateway : getBalanceAll : e = " + e);
                response = new Response(500, "Error in get balance all call", {}, e);
                res.status(response.code).json(response);
            }
        })

    router.route('/transfer/:accID/:amt')
        .post(async (req, res) => {
            let response;
            try {
                response = await assetsClient.doTransfer(req.params.accID, req.params.amt, {gasPrice: "0"});
                console.log(req.params.accID);
                res.status(200).json(response);
            } catch (e) {
                logger.error("API Gateway : transfer : e = " + e);
                response = new Response(500, "Error in transfer call", {}, e);
                res.status(response.code).json(response);
            }
        })
}

module.exports.init = init;
