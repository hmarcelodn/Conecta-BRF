brfPhoneGapApp.controller('loginController', function($scope, $route, $location){
	
	$scope.login = function(event){
		console.log("submit");
		$location.path("/Main");
	};
});