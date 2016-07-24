var localStrategy = require('passport-local').Strategy;
var visitor = require('../App/models/visitor.js');

module.exports = function(passport){

	passport.serializeUser(function(user, done){
		done(null,user.id);	
	});

	passport.deserializeUser(function(id,done){
	 	visitor.findById(id, function(err,user){
	 		done(err,user);
	 	});
	});

	passport.use('local-login', new localStrategy({ 
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
		},
		function(req, email, password, done){

			visitor.findOne({ email : email, password : password }, function(err, user){
				if (err) { return done(err); }
				if (!user) { return done(null, false); }
				if (!user.validPassword(password)) { return done(null, false); }
				return done(null, user);
			});
		}
	));

	passport.use('local-signup', new localStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
		},
		function(req, email, password, done){

			visitor.findOne({email : email, password : password}, function(err, user){
				if (err) { return done(err); }
				if (user) {return done(null, false); } //also send flash message?
				else {
					var newVisitor = new visitor();
					newVisitor.firstName = req.body.firstName;
					newVisitor.lastName = req.body.lastName;
					newVisitor.password = password;
					newVisitor.email = email;

					newVisitor.save(function(err){
						if (err)
							throw err;
						return done(null, newVisitor);
					});
				}
			});
		}
	));

};
