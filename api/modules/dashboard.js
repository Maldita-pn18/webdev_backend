const model = require('../schema');
let response = null;
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");

module.exports = (req, res) => {
    let day = date();
    let month = months();
    let year = years();
    let toQuery = month+" "+day+", "+year
    let responseData = {};
    /*
        return the tickets of the day only
    */
    model.Ticket.aggregate(
        [
            {
                $match: { date: toQuery}
            },
            {
                $group: { _id: { date: '$date'}, count: { $sum: 1 } }
            }
        ],
        (err, result) => {
            responseData["ticketCount"] = result[0].count
            console.log(result)
        }).catch(err => {
            response = errorResponse(404, err, "Service Unavailable!")
            res.status(response.status).send(response);
        });
    model.Bus.find({},(err,result)=>{
        if(err){
            response = errorResponse(503, err, "Service Unavailable");
            res.send(response);
        }
        responseData["busCount"] = result.length
        response = successResponse(203 ,responseData ,"Services Available!" );
        res.send(response);
    })
}

date = () => {
    let day = new Date().getDate();
    return day;
}
months = () => {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    let month = new Date().getMonth();
    return months[month];
}
years = () => {
    let year = new Date().getFullYear();
    return year;
}