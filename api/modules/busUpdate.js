let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");
let model = require('../schema');

module.exports = (req,res) =>{
    model.Bus.findByIdAndUpdate({"_id":req.params.id},{$set:req.body} ,function (err,result) {
        if (err){
            response = errorResponse(503, err, "Service Unavailable");
            res.send(response);
        }
        response = successResponse(203 ,result ,"Updated Successfully!" );
        res.send(response);
    })
}