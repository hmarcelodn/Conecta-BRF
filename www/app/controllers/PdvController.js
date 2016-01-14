brfPhoneGapApp.controller('pdvController', function($scope, $route, $location){
	$scope.test = "PhoneGap!";

	$scope.submitSearch = function(event){
		console.log("sumitt");
		$location.path('/search');
	};
});