brfPhoneGapApp.controller('categoryController', ['$scope', '$routeParams', 'Category', '$rootScope', 'Module', 
	function($scope, $routeParams, Category, $rootScope, Module){

	$scope.routeParams = $routeParams;
	$scope.currentModule;

	if($scope.routeParams.default === 'defaultModule'){
		console.log("defaultModuleLoaded");
		$rootScope.$emit('defaultModuleLoaded');			
	}

	Module.getModuleBySlug($scope.routeParams.slug).then(function (module){
		$scope.currentModule = module;

		Category.getCategories(module.categoryType, $scope.routeParams.channelId).then(function(categories){
			$scope.categories = categories;
		});
	});
}]);