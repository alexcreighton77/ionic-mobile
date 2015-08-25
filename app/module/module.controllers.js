'use strict';
angular.module('IonicMobileAppTemplate.Module.controllers', [])

	.controller('ModuleBaseCtrl', ['$scope', '$state', function($scope, $state){
		$scope.debug = undefined;

	   	$scope.goHome = function() {
	   		console.log('going to home');
			$state.go('app.home');
		};

		$scope.goSettings = function() {
			console.log('going to settings');
			$state.go('app.settings');
		};
	}]);