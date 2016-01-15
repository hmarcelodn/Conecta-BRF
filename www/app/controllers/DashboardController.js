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

	$scope.dashboardOpts = {
		availableOptions:
		[
			{ id: '0', name: "HOY" },
			{ id: '1', name: "ESTA SEMANA" },
			{ id: '2', name: "MES ACTUAL" },
			{ id: '3', name: "ULTIMOS 30 DIAS" },
			{ id: '4', name: "TRIMESTRE" }
		],
		selectedOption: { id: '0', name: 'HOY' }
	};
		
});