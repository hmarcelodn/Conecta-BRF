brfPhoneGapApp.controller('formController', ['$scope', '$route', '$routeParams', 'Customer' , 
	function($scope, $route, $routeParams, Customer){
	
	$scope.channelId = $routeParams.channelId;
	$scope.loadingCustomers = true;

	Customer.getCustomers().then(function(customers){
		$scope.customers = customers;
		$scope.loadingCustomers = false;
	});	

}]);