brfPhoneGapApp.controller('coachingController', function($scope, $route, $routeParams, questionService, surveyService, moduleService){	


	moduleService.getModuleByName('Coaching Supervisor').then(function(module){

		/* Recursive Method */
		var getQuestions = function(){
			surveyService.getPendingSurvey().then(function(pendingSurvey){
				if(pendingSurvey === undefined){
					surveyService.setSurvey(new Date().getTime().toString()).then(function(){
						surveyService.enableAuditMode($routeParams.channelId, $routeParams.pdvId, $routeParams.sellerId);
						getQuestions();
					})
					.catch(function(error){
						surveyService.disableAuditMode();
					});	
				}
				else{
					questionService.getQuestions(module, pendingSurvey).then(function(questions){
						$scope.questions = questions;
					});
				}			

			});
		};

		/* Call Recursive Method */
		getQuestions();

	});

});