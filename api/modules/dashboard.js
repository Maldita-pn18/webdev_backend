const model = require('../schema');
let response = null;
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");

module.exports = (req, res) => {
    let day = date();
    var re = new RegExp(day, "i");
    let responseData = {};
    /*
        return the tickets of the day only
    */
    model.Ticket.aggregate(
        [
            {
                $match: { date: { $regex: re } }
            },
            {
                $group: { _id: { date: '$date', bus: '$bus' }, count: { $sum: 1 } }
            },
            {
                $group:{_id:'$_id.bus',busCount:{$sum:1}}
            }
        ],
        (err, result) => {
            console.log(result)
            // responseData["ticketCount"] = result[0].ticketCount
        }).catch(err => {
            response = errorResponse(404, err, "Service Unavailable!")
            res.status(response.status).send(response);
        });
    // ).exec(function (err, data) {
    //     starRatingCount = data;
    //     console.log("this is data aggregate:", data);
    // });

    // model.Ticket.aggregate(
    //     [
    //         {
    //             $match: { date: { $regex: re } }
    //         },
    //         {
    //             $group: { _id: '$bus', busCount: { $sum: 1 } }
    //         }
    //     ], (err, result) => {
    //         responseData["busCount"] = result[0].busCount
    //     }).catch(err => {
    //         response = errorResponse(404, err, "Service Unavailable!")
    //         res.status(response.status).send(response);
    //     })

    // console.log(responseData)
    // response = successResponse(404, responseData, "Service navailable!")
    // res.status(response.status).send(response);
}

date = () => {
    let day = new Date().getDate();
    return day
}