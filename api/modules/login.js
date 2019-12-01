const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");
let model = require('../schema')

module.exports = (reqUsername, reqPassword, res) => {
    model.Accounts.findOne({ "username": reqUsername}, (err, returns) => {
        if (err) {
            response = errorResponse(503, err, "Service Unavailable");
            res.send(response);
        }
        if (returns !== null) {
            bcrypt
                .compare(reqPassword, returns.password)
                .then(match => {
                    if (match) {
                        response = successResponse(200, {
                            accessToken: jwt.sign({ username: returns.username, password: returns.password }, "Linkod", { expiresIn: '12h' }),
                            auth: true
                        }, "Login Successful!")
                    } else {
                        response = errorResponse(404, null, "Password is incorrect!")
                    }
                    res.send(response);
                })
                .catch(err => {
                    response = errorResponse(404, err, "Username not Found!")
                    res.status(response.status).send(response);
                })
        }else {
            response = errorResponse(404, err, "Account is not Found!")
            res.send(response);
        }
    })
}