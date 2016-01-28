brfPhoneGapApp.controller('surveyController', function($scope, $route, $location, surveyService){
	
	$scope.closeAudit = function(){
		$location.path("/Main");

		surveyService.closeSurvey().then(function(){
			surveyService.disableAuditMode();		
			$location.path('/Welcome');
		});
	};
	
});