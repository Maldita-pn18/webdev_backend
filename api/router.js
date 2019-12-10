const express = require('express');
const routes = express.Router();
let dateLocationCheck = require("./modules/dateLocation");
let dummyAccount = require("./testingaddAccount");
let login = require('./modules/login');
let dashboard = require('./modules/dashboard');
let bus = require('./modules/bus');
let busAdd = require ('./modules/busAdd');
let busDelete = require ('./modules/busDelete');
let busUpdate = require('./modules/busUpdate');
let saveTicket = require('./modules/saveTickets');
let bookings = require('./modules/bookings');
let bookingDelete = require('./modules/deleteBooking');

/*User routes*/
//
//
routes.route('/date-location/:from/:to').get((req, res) => {
    dateLocationCheck(req, res);
});

routes.route('/tickets/:from/:to/:date').get((req, res) => {
    //expected object response(res) from the database is : bus,available seats,departure time, arrival time, duration, bus No.
});

routes.route('/checkout').post((req, res) => {
    //save to database
    //expected response from the database TicketNo, BusNo, SeatNo/s, expected Bill, Date , from, to, duration,
    //arrival Time, departure time,
    //get the data passed from the front-end use req.body
});

routes.route('/ticket/book').post((req,res) => {
    saveTicket(req,res);
});

//
//
/*end of user routes*/
//
//
/*start of admin routes*/
//
//
routes.route('/admin/addtest').post((req, res) => {
    //this is just a test to add an Admin account
    //but it's working
    dummyAccount();
})

routes.route('/login/admin/:username/:password').get((req, res) => {
    login(req.params.username, req.params.password, res);
})

routes.route('/admin/dashboard').get((req, res) => {
    dashboard(req,res);
});
routes.route('/admin/bus/').get((req,res) => {
    bus(req,res);
})
routes.route('/admin/busAdd').post((req,res) => {
    // console.log(req.body);
    busAdd(req,res)
})
routes.route('/admin/busDelete/:id').delete((req,res) => {
    busDelete(req,res)
})
routes.route('/admin/busUpdate/:id').put((req,res) => {
    busUpdate(req,res)
})
routes.route('/admin/bookings').get((req,res) => {
    bookings(req,res);
})
routes.route('/admin/bookingDelete/:id').delete((req,res) => {
    bookingDelete(req,res);
})
//
//
/* end of admin routes */
module.exports = routes;