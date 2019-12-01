const model = require('../schema')
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");
module.exports = (req, res) => {
    let from = req.params.from;
    let to = req.params.to;
    model.Bus.find({ "bus.routes.start": from, "bus.routes.end": to }, (err, returns) => {
        if (err) {
            response = errorResponse(503, err, "Service Unavailable");
            res.send(response);
        }
        response = successResponse(201, { "buses": returns}, "Request Successfull");
        res.send(response);
    })
}