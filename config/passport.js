var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function() {

	var Usuario = mongoose.model('Usuario');

	passport.use(new GitHubStrategy({
		clientID : '12a8509e9c29359ae71d',
		clientSecret : 'f010e5986adf70e05c7e7451e6242364cc306cd9',
		callbackURL : 'http://localhost:3000/auth/github/callback'
	}, function(accessToken, refreshToken, profile, done) {
		Usuario.findOrCreate(
			{ "login" : profile.username },
			{ "nome" : profile.username },
			function(erro, usuario) {
				if(erro) {
					console.error(erro);
					return done(erro);
				}

				return done(null, usuario);
			}
		);
	}));

	passport.serializeUser(function(usuario, done) {
		done(null, usuario._id);
	});

	passport.deserializeUser(function(id, done) {
		Usuario.findById(id).exec()
			.then(function(usuario) {
				done(null, usuario);
			});
	});

};