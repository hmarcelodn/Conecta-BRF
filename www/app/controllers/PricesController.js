brfPhoneGapApp.controller('pricesController', function($scope, questionService, moduleService, surveyService){

	moduleService.getModuleByName('Toma de Precios').then(function(module){
		surveyService.getPendingSurvey().then(function(pendingSurvey){
			questionService.getQuestions(module, pendingSurvey).then(function(questions){
				$scope.questions = questions;
			});
		});
	});	
	
});