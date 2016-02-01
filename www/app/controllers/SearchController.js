brfPhoneGapApp.controller('searchController', function($scope, $route, $routeParams, sellerService){	

	$scope.pdvId = $routeParams.pdvId;
	$scope.channelId = $routeParams.channelId;

	sellerService.getSellers().then(function(sellers){
		$scope.sellers = sellers;
	});

	
});