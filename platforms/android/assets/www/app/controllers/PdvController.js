brfPhoneGapApp.controller('pdvController', ['$scope', '$route', '$location', '$routeParams', 'Customer', 
	function($scope, $route, $location, $routeParams, Customer){
	
	Customer.getCustomerTypes().then(function(customerTypes){
		$scope.customerTypes = customerTypes;
		$scope.selectedCustomerType = $scope.customerTypes[0];
	});

	$scope.companyName;
	$scope.identifier;
	$scope.address;

	$scope.addPdv = function(event){	
		Customer.setCustomer(0, $scope.companyName, $scope.identifier, $scope.address, $scope.selectedCustomerType.id).then(function(){
			$location.path('Channel/' + $routeParams.channelId + '/Pdv/0/Seller');
		});
	};
}]);