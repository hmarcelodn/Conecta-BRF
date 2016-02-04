brfPhoneGapApp.controller('categoryController', ['$scope', '$routeParams', 'Category', '$rootScope', 'Module', 
	function($scope, $routeParams, Category, $rootScope, Module){

	$scope.routeParams = $routeParams;
	$scope.nextModule;
	$scope.currentModuleName;

	switch($routeParams.slug){
		case 'ejecucion_pdv':
			$scope.categoryTitle = 'EJECUCIÓN PDV';
			$scope.slug = $routeParams.slug;
			$scope.nextModule = 'Execution';
			break;
		case 'toma_precios':
			$scope.categoryTitle = 'TOMA DE PRECIOS';
			$scope.slug = $routeParams.slug;
			$scope.nextModule = 'Prices';
			break;
	}

	if($scope.routeParams.default === 'defaultModule'){
		console.log("defaultModuleLoaded");
		$rootScope.$emit('defaultModuleLoaded');			
	}

	Module.getModuleBySlug($scope.slug).then(function (module){
		Category.getCategories(module.categoryType, $scope.routeParams.channelId).then(function(categories){
			$scope.categories = categories;
		});
	});
}]);