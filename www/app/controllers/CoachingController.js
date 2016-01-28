brfPhoneGapApp.controller('coachingController', function($scope, $route, questionService, surveyService){	

	questionService.getCoachingQuestions().then(function(questions){
		$scope.questions = questions;

		surveyService.getPendingSurvey(1).then(function(pendingSurveyData){

			if(pendingSurveyData === undefined){
				surveyService.setSurvey(new Date().getTime().toString())
				.then(function(){
					surveyService.enableAuditMode();
				})
				.catch(function(error){
					surveyService.disableAuditMode();
				});	
			}

		});
	});
	
});