let model = require('../schema');
let response = null;
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");

const store = (req, res) => {
    let ticket = new model.Ticket(req.body);
    ticket["ticketNumber"] = ticketNum();
    ticket
        .save()
        .then((result) => {
            response = successResponse(203, result, "Service Available");
            res.send(response);
        })
        .catch(err => {
            if (err.code === 11000) {
                store(req,res);
            } else {
                response = errorResponse(503, err, "Service Unavailable");
                res.send(response);
            }
        })
}

ticketNum = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = store;