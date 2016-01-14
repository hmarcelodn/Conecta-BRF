brfPhoneGapApp.controller('dashboardController', function($scope, $route){
	$scope.visitedPDVs = 12;
	$scope.obtainedCompliance = 89 + "%";

	$scope.coachingPoints = 
	{
		percentage: 90,
		points: 
		[
			{ name: 'Punto #1', percentage: 90 },
			{ name: 'Punto #2', percentage: 90 },
			{ name: 'Punto #3', percentage: 90 },
			{ name: 'Punto #4', percentage: 90 }
		]
	};

	$scope.executionPoints =
	{
		percentage: 72,
		points: 
		[
			{ name: 'Punto #1', percentage: 90 },
			{ name: 'Punto #2', percentage: 90 },
			{ name: 'Punto #3', percentage: 90 },
			{ name: 'Punto #4', percentage: 90 }
		]		
	};
});