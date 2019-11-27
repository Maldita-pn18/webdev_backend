const express = require('express');
const routes = express.Router();
let dateLocationCheck = require("../modules/dateLocation")

routes.route('/date-location/:time/:date/:from/:to').get((req,res)=>{
    dateLocationCheck(req,res);
});

routes.route('/tickets/:from/:to/:date').get((req,res)=>{
    //expected object response(res) from the database is : bus,available seats,departure time, arrival time, duration, bus No.

});

routes.route('/checkout').post((req,res)=>{
    //save to database
    //expected response from the database TicketNo, BusNo, SeatNo/s, expected Bill, Date , from, to, duration,
    //arrival Time, departure time,
    //get the data passed from the front-end use req.body

});


module.exports = routes;