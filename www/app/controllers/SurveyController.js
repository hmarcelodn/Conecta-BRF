brfPhoneGapApp.controller('surveyController', ['$scope', '$route', '$location', 'Survey', 
	function($scope, $route, $location, Survey){
	
	$scope.closeAudit = function(){		
		Survey.disableAuditMode();
		
		Survey.closeSurvey().then(function(){						
			$location.path('/Welcome');
		});
	};
	
}]);