let model = require('../schema');
let response = null;
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");

module.exports = (req, res) => {
    let ticket = new model.Ticket(req.body);
    ticket
        .save()
        .then((result) => {
            response = successResponse(203, result, "Service Available");
            res.send(response);
        })
        .catch(err => {
            response = errorResponse(503, err, "Service Unavailable");
            res.send(response);
        })
}