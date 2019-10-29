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

    router.route('/transfer/:accID')
        .post(async (req, res) => {
            let response;
            try {
                response = await assetsClient.doTransfer(req.params.accID, 10, {gasPrice: "0"});
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
