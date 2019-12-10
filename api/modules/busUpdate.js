let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");
let model = require('../schema');

module.exports = (req,res) =>{
    let seatsCount = req.body.bus.seats
    let seat = "{"
    for(var i = 1; i < Number(seatsCount)+1; ++i){
        seat += '"'+i+'"'+":"+true+","
    }
    seat = seat.slice(0, seat.length-1)+seat.slice(seat.length)+"}";
    req.body.bus["seats"] = JSON.parse(seat)
    model.Bus.findOneAndUpdate({"_id":req.params.id},{$set:req.body} ,function (err,result) {
        if (err){
            response = errorResponse(503, err, "Service Unavailable");
            res.send(response);
        }
        response = successResponse(203 ,result ,"Updated Successfully!" );
        res.send(response);
    })
}