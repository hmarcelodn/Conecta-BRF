brfPhoneGapApp.controller('pdvController', function($scope, $route, $location, customerService){
	
	customerService.getCustomerTypes().then(function(customerTypes){
		$scope.customerTypes = customerTypes;
	});

	$scope.submitSearch = function(event){
		$location.path('/Search');
	};
});