brfPhoneGapApp.controller('categoryController', ['$scope', '$routeParams', 'Category', function($scope, $routeParams, Category){

	$scope.routeParams = $routeParams;
	$scope.nextModule;

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

	Category.getCategories().then(function(categories){
		$scope.categories = categories;
	});
}]);