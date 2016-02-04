brfPhoneGapApp.controller('formController', function($scope, $route, $routeParams, customerService){
	
	$scope.channelId = $routeParams.channelId;
	$scope.loadingCustomers = true;

	customerService.getCustomers().then(function(customers){
		$scope.customers = customers;
		$scope.loadingCustomers = false;
	});	

});