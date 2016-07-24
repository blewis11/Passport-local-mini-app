var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var visitorSchema = new Schema({
	firstName: { type: String, required : true},
	lastName : { type: String, required : true},
	password : { type: String, required : true},
	email : { type: String, required : true},
	posts : [{ type: String }]
});

visitorSchema.methods.validPassword = function(pwd){
	return (this.password == pwd);
};

var visitor = mongoose.model('Visitor', visitorSchema);

module.exports = visitor;