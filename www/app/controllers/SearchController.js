brfPhoneGapApp.controller('searchController', ['$scope', '$route', '$routeParams', 'Seller', 'Module', 'Login',
	function($scope, $route, $routeParams, Seller, Module, Login){	

	$scope.pdvId = $routeParams.pdvId;
	$scope.channelId = $routeParams.channelId;	
	$scope.defaultModuleSlug;

	//Get Default module to be redirected
	Module.getDefaultModules($scope.channelId, Login.getToken().id_role).then(function (result){
		$scope.defaultModuleSlug = result.slug;
	});

	Seller.getSellers().then(function(sellers){
		$scope.sellers = sellers;		
	});	
	
}]);