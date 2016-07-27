module.exports = function (app, passport){

	//test route to get user information
	app.get('/userInfo', function(req,res){
		var user = req.user;
		res.json(user);
	});

	//home page with login
	app.get('/', function(req,res){
		res.sendfile('./Public/views/index.html');
	});

	//show login form
	app.get('/login', function(req,res){
		res.sendfile('./Public/views/login.html');
	});

	//process login form
	app.post('/login', passport.authenticate('local-login', { 
			successRedirect: '/loggedIn',
			failureRedirect : '/register'
	}));

	//get sign up form
	app.get('/register', function(req,res){
		res.sendfile('./Public/views/register.html');
	});


	//process sign up form
	app.post('/register', passport.authenticate('local-signup',{
		successRedirect : '/login',
		failureRedirect : '/register'
	}));


	//protected page you visit once logged in
	app.get('/loggedIn', isLoggedIn, function(req,res){
		res.sendfile('./Public/views/loggedIn.html');
	});

	//logout option
	app.get('/logout', function(req,res){
		req.logout();
		res.redirect('/');
	});


	//middleware, check if the user is logged in
	function isLoggedIn(req,res,next){
		if (req.isAuthenticated())
			return next();

		res.redirect('/');
	}
}