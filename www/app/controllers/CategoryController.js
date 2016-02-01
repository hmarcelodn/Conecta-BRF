brfPhoneGapApp.controller('categoryController', function($scope, $route, $routeParams, categoryService){

	if($routeParams.mode === undefined){
		$scope.categoryTitle = 'EJECUCIÓN PDV';
		$scope.mode = 0;
	}

	if($routeParams.mode === "1"){
		$scope.categoryTitle = 'TOMA DE PRECIOS';
		$scope.mode = parseInt($routeParams.mode);
	}

	categoryService.getCategories().then(function(categories){
		$scope.categories = categories;
	});

});