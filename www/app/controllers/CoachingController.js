brfPhoneGapApp.controller('coachingController', function($scope, $route, questionService, surveyService){	

	questionService.getCoachingQuestions().then(function(questions){
		$scope.questions = questions;
		surveyService.enableAuditMode();
	});
	
});