const express = require('express');
const routes = express.Router();
let dateLocationCheck = require("./modules/dateLocation")
let dummyAccount = require("./testingaddAccount")
let login = require('./modules/login')

routes.route('/date-location/:from/:to').get((req,res)=>{
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

routes.route('/admin/addtest').post((req,res)=>{
    //this is just a test to add an Admin account
    //but it's working
    dummyAccount();
})

routes.route('/login/admin/:username/:password').get((req,res)=>{
    login(req.params.username,req.params.password,res);
})


module.exports = routes;