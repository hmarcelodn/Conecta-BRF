brfPhoneGapApp.controller('pricesController', function($scope, $routeParams, questionService, moduleService, surveyService){

	moduleService.getModuleByName('Toma de Precios').then(function(module){
		surveyService.getPendingSurvey().then(function(pendingSurvey){
			questionService.getQuestions(module[0].moduleId, pendingSurvey.id, $routeParams.categoryId, module[0].categoryType).then(function(questions){
				$scope.questions = questions;
			});
		});
	});	
	
});