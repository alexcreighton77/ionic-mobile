'use strict';
angular.module('IonicMobileAppTemplate.Core.controllers', [])

	.controller('AppCtrl', ['$scope', 'User', function($scope, User){
		$scope.debug = undefined;

		User.initSocial();

	}])

	.controller('CoreHomeCtrl', ['$scope', '$state', '$stateParams', '$cordovaGeolocation', '$interval', 'User', function($scope, $state, $stateParams, $cordovaGeolocation, $interval, User){
		$scope.isFacebookSync = User.isLoggedIn('facebook');
		$scope.isTwitterSync = User.isLoggedIn('twitter');
		$scope.profileView = false;
		$scope.socialProfile = {};
		$scope.debug = 'all is good';
		$scope.myLat = 0;
		$scope.myLng = 0;



		$scope.socialLogin = function(network) {
			User.socialLogin(network, function(err){
				if(err){
					console.log(err);
				} else {

					if(network == 'facebook'){
						$scope.isFacebookSync = true;
					}

					if(network == 'twitter'){
						$scope.isTwitterSync = true;
					}

					$scope.$apply();
					//$state.go($state.current, {}, {reload: true});
				}
			});
	    };

	    $scope.viewSocialProfile = function(network) {
	    	$scope.debug = 'start view social profile';
	    	User.getSocialProfile(network, function(err, userObject){

	    		if(err){
	    			console.log(err);
	    		} else {
	    			$scope.debug = 'got profile for ' + network;
	    			console.log('userObject', userObject);


	    			if(network == 'facebook'){
	    				$scope.socialProfile.id = userObject.id;
	    				$scope.socialProfile.name = userObject.name;
	    				$scope.socialProfile.thumbnail = userObject.picture;
	    				$scope.socialProfile.screenName = userObject.link;
	    				$scope.socialProfile.firstName = userObject.first_name;
	    				$scope.socialProfile.lastName = userObject.last_name;
	    				$scope.socialProfile.language = userObject.locale;
	    			}

	    			if (network == 'twitter'){
	    				$scope.socialProfile.id = userObject.id;
	    				$scope.socialProfile.name = userObject.name;
	    				$scope.socialProfile.thumbnail = userObject.thumbnail;
	    				$scope.socialProfile.screenName = userObject.screen_name;
	    				$scope.socialProfile.firstName = userObject.first_name;
	    				$scope.socialProfile.lastName = userObject.last_name;
	    				$scope.socialProfile.language = userObject.lang;
	    			}

	    			$scope.profileView = true;
	    			$scope.$apply();
	    		}
	    	});
	    };


	   	$scope.goHome = function() {
	   		console.log('going to home');
			$state.go('app.home');
		};

		$scope.goSettings = function() {
			console.log('going to settings');
			$state.go('app.settings');
		};

		var posOptions = {timeout: 10000, enableHighAccuracy: false};
	    $interval(function(){
		  	$cordovaGeolocation
		  		.getCurrentPosition(posOptions)
		  		.then(function (position) {
		      		$scope.myLat = position.coords.latitude;
		      		$scope.myLng = position.coords.longitude;
		    	}, function(err) {
		      		console.log(err);
		    	});
	    }, 5000);

	}])

	.controller('CoreSettingsCtrl', ['$scope', '$state', 'AppSettingsServ', function($scope, $state, AppSettingsServ){
		$scope.debug = undefined;
		$scope.settings = {};

		AppSettingsServ.getAllSettings(function(err, settings){
			if(err){
				$scope.debug = err;
				console.log('got err', err);
			} else {
				$scope.settings = settings;
				console.log('got settings', settings);
			}
		});

		$scope.saveSettings = function(settings){
			AppSettingsServ.setAllSettings(settings);
			console.log('settings saved');
			$state.go('app.home');
		};

		$scope.cancelSettings = function() {
			console.log('settings not saved');
			$state.go('app.home');
		};



	}])

	.controller('CoreProfileCtrl', ['$scope', '$localstorage', function($scope, $localstorage){
		$scope.debug = undefined;
		$scope.user = $localstorage.getObject('user');

	}]);