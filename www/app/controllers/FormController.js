brfPhoneGapApp.controller('formController', ['$scope', '$route', '$routeParams', 'Customer' , 
	function($scope, $route, $routeParams, Customer){
	
	$scope.channelId = $routeParams.channelId;

	Customer.getCustomers().then(function(customers){
		$scope.customers = customers;
	});	

}]);