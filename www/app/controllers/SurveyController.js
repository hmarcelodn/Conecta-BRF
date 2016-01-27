brfPhoneGapApp.controller('surveyController', function($scope, $route, $location, surveyService){
	
	$scope.closeAudit = function(){
		$location.path("/Main");
		surveyService.disableAuditMode();		
	};

});