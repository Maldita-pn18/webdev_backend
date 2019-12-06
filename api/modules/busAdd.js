let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");
let model = require('../schema');

module.exports = (req,res) => {
    let bus = new model.Bus(req.body);
    bus
    .save()
    .then((result) => {
        response = successResponse(203, result, "Service Available");
        res.send(response);
    })
    .catch (err => {
        response = errorResponse(503, err, "Service Unavailable");
        res.send(response);
    }) 

}

