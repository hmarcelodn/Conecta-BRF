brfPhoneGapApp.controller('searchController', ['$scope', '$route', '$routeParams', 'Seller', 
	function($scope, $route, $routeParams, Seller){	

	$scope.pdvId = $routeParams.pdvId;
	$scope.channelId = $routeParams.channelId;
	$scope.loadingSellers = true;

	Seller.getSellers().then(function(sellers){
		$scope.sellers = sellers;
		$scope.loadingSellers = false;
	});

	
}]);