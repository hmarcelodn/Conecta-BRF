brfPhoneGapApp.controller('categoryController', ['$scope', '$routeParams', 'Category', function($scope, $routeParams, Category){

	$scope.routeParams = $routeParams;

	if($routeParams.modeId === "0"){
		$scope.categoryTitle = 'EJECUCIÓN PDV';
		$scope.modeId = 0;
	}

	if($routeParams.modeId === "1"){
		$scope.categoryTitle = 'TOMA DE PRECIOS';
		$scope.modeId = parseInt($routeParams.modeId);
	}

	Category.getCategories().then(function(categories){
		$scope.categories = categories;
	});

	$scope.getRoute = function(category){
		var route = '#/Channel/' + $scope.routeParams.channelId + '/Pdv/' + $scope.routeParams.pdvId + '/Seller/' + $scope.routeParams.sellerId + '/';

		if($scope.modeId === 1){
			return route + 'Prices/' + category.categoryId;
		}

		return route + 'Execution/' + category.categoryId;
	};

}]);