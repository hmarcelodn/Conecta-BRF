brfPhoneGapApp.controller('categoryController', ['$scope', '$routeParams', 'Category', '$rootScope', 'Module', '$location',
	function($scope, $routeParams, Category, $rootScope, Module, $location){

	$scope.routeParams = $routeParams;
	$scope.currentModule;

	if($scope.routeParams.default === 'defaultModule'){
		console.log("defaultModuleLoaded");
		$rootScope.$emit('defaultModuleLoaded');			
	}

	Module.getModuleBySlug($scope.routeParams.slug).then(function (module){
		$scope.currentModule = module;

		Category.getCategories(module.categoryType, $scope.routeParams.channelId).then(function(categories){
			if(categories.length > 0){
				$scope.categories = categories;
			}
			else{
				$location.path('/Channel/' + $scope.routeParams.channelId + 
							   '/Pdv/' + $scope.routeParams.pdvId + 
							   '/Seller/' + $scope.routeParams.sellerId + 
							   '/Module/' + module.moduleId);
			}			
		});
	});
}]);