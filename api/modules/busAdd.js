let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");
let model = require('../schema');

module.exports = (req,res) => {
    let bus = new model.Bus(req.body);
    let seat = "{"
    for(var i = 1; i < Number(bus.bus.seats)+1; ++i){
        seat += '"'+i+'"'+":"+true+","
    }
    seat = seat.slice(0, seat.length-1)+seat.slice(seat.length)+"}";
    bus.bus["seats"] = JSON.parse(seat)
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

