brfPhoneGapApp.controller('coachingController', function($scope, $route, questionService){
	
	questionService.getCoachingQuestions().then(function(questions){
		$scope.questions = questions;
	});
	
});