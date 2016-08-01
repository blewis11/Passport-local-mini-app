var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'); 

var Schema = mongoose.Schema;

var visitorSchema = new Schema({
	firstName: { type: String, required : true},
	lastName : { type: String, required : true},
	password : { type: String, required : true},
	email : { type: String, required : true},
	posts : [{ 
		message: {type :String },
		date: {type: Date, require: true, default: Date.now}
	}]
});

visitorSchema.methods.validPassword = function(password){
	return (password == this.password);
};

var visitor = mongoose.model('Visitor', visitorSchema);

module.exports = visitor;