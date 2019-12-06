let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");
let model = require('../schema');

module.exports = (req,res) => {
    model.Bus.findOneAndRemove({'_id':req.params.id},function (err,result){
        if (err){
            response = errorResponse(503, err, "Service Unavailable");
            res.send(response);
        }
        response = successResponse(203 ,result ,"Deleted Successfully!" );
        res.send(response);
    })
}