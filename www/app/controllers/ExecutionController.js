brfPhoneGapApp.controller('executionController', function($scope, $route, $routeParams, questionService, moduleService, surveyService){
	
	moduleService.getModuleByName('Ejecución PDV').then(function(module){
		surveyService.getPendingSurvey().then(function(pendingSurvey){
			if($routeParams.categoryId !== undefined){
				questionService.getQuestions(module.moduleId, pendingSurvey.id, $routeParams.categoryId).then(function(questions){
					$scope.questions = questions;
				});
			}
			else{
				questionService.getQuestions(module[0].moduleId, pendingSurvey, undefined, module[0].categoryType).then(function(questions){
					$scope.questions = questions;
				});
			}
		});
	});	

});