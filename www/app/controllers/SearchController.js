brfPhoneGapApp.controller('searchController', function($scope, $route, sellerService){
	
	sellerService.getSellers().then(function(sellers){
		$scope.sellers = sellers;
	});

});