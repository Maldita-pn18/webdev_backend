const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let Tickets = new Schema({   //let Tickets = new Schema( {data structure} , {collection:"collectionanme"} )
	date: { type: String, required: true },
	time: { type: String, required: true },
	from: { type: String, required: true },
	to: { type: String, required: true },
	bus: { type: String, required: true },
	busNumber: { type: String, required: true },
	seats: { type: [Number], required: true },
	departureTime: { type: String, required: true },
	arrivalTime: { type: String, required: true },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	bill: { type: Number, required: true }
}, {
		collection: "Tickets"
	}
);

let bus = new Schema({
	busName: { type: String, required: true, },
	bus: {
		seats: { type: Object, required: true },
		busNumber: { type: String, required: true },
		routes: {
			start: { type: String, required: true },
			end: { type: String, required: true },
		}
	},
	startTime: { type: String, required: true },
	endTime: { type: String, required: true },
	duration: { type: String, required: true },
	fare: {
		child: { type: Number, required: true },
		adult: { type: Number, required: true }
	}
}, { collection: "buses" });

let Account = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: {
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		middlename: { type: String, required: false },
		suffix: { type: String, required: false }
	},
	position: { type: String, required: false }
}, { collection: "accounts" })


Account.pre("save", function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	this.password = bcrypt.hashSync(this.password, 10);
	next();
});

const Accounts = mongoose.model("Account", Account)
const Ticket = mongoose.model("Tickets", Tickets);
const Bus = mongoose.model("bus", bus)
module.exports = { Ticket, Bus, Accounts };
