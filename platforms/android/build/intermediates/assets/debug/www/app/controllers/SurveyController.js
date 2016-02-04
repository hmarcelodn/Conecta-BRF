brfPhoneGapApp.controller('surveyController', function($scope, $route, $location, surveyService){
	
	$scope.closeAudit = function(){		
		surveyService.disableAuditMode();
		
		surveyService.closeSurvey().then(function(){						
			$location.path('/Welcome');
		});
	};
	
});