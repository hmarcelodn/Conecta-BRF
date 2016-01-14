brfPhoneGapApp.controller('pdvController', function($scope, $route, $location){
	$scope.test = "PhoneGap!";

	$scope.submitSearch = function(event){
		$location.path('/Search');
	};
});