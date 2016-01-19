brfPhoneGapApp.controller('formController', function($scope, $route, customerService){
	
	customerService.getCustomers().then(function(customers){
		$scope.customers = customers;
	});

});