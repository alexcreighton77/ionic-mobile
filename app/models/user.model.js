'use strict';

angular.module('IonicMobileAppTemplate.models.User', [])

	.factory('User', ['$localstorage', '_', function( $localstorage, _ ){

		return{

			initSocial: function(){
				hello.init({
	      			facebook : '350686555119014',
	      			twitter : 'U9smkVu9v8rmhtVAebAm0KFa8',
	    		}, {
			      // Define the OAuth2 return URL
			      redirect_uri : 'http://127.0.0.1:8080/',
			      oauth_proxy: ' https://auth-server.herokuapp.com/proxy'
			    });

			},
			syncFacebook: function(callback){

				// send login request
				hello('facebook').login(function() {
					console.log('Successful FB login');
					callback();

					/*
					// request profile data
					hello('facebook').api('/me').then(function(facebookUserObject){

						// get and update the current user in local storage
						var user = $localstorage.getObject('user');
						_.merge(user, {social:{facebook:{profile:facebookUserObject}}});
						$localstorage.setObject('user', user);
						callback(user);
					});
					*/
			    });
			},
			syncTwitter: function(callback){

				// send login request
		      	hello('twitter').login(function() {
		      		console.log('Successful Twitter login');
		      		callback();

		      		/*
		      		// request profile data
					hello('twitter').api('/me').then(function(twitterUserObject){

						// get and update the current user in local storage
						var user = $localstorage.getObject('user');
						_.merge(user, {social:{twitter:{profile:twitterUserObject}}});
						$localstorage.setObject('user', user);
					});
					*/
		      	});
			},
			socialLogin: function(network, callback){
				hello(network).login(function(){
					console.log('Successful login to ' + network);
					callback(null);
				}, function(err){
					console.log('Social Media Error', err);
					callback(err);
				});
			},
			isLoggedIn: function(network) {
				var session = hello(network).getAuthResponse();
				var current_time = (new Date()).getTime() / 1000;

				return session && session.access_token && session.expires > current_time;
			},
			getSocialProfile: function(network, callback){
				hello(network).api('/me').then(function(userObject){
					callback(null, userObject);
				}, function(err){
					console.log('Social Media Error', err);
					callback(err);
				});
			}
		}
	}]);