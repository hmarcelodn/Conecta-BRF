brfPhoneGapApp.controller('formController', function($scope, $route, $routeParams, customerService){
	
	$scope.channelId = $routeParams.channelId;

	customerService.getCustomers().then(function(customers){
		$scope.customers = customers;
	});	

});