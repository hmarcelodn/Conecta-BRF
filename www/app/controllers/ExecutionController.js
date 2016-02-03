brfPhoneGapApp.controller('executionController', ['$scope', '$route', '$routeParams', 'Question', 'Module', 'Survey', 
	function($scope, $route, $routeParams, Question, Module, Survey){
	
	Module.getModuleByName('Ejecución PDV').then(function(module){
		Survey.getPendingSurvey().then(function(pendingSurvey){
			if($routeParams.categoryId !== undefined){
				Question.getQuestions(module.moduleId, pendingSurvey.id, $routeParams.categoryId).then(function(questions){
					$scope.questions = questions;
				});
			}
			else{
				Question.getQuestions(module[0].moduleId, pendingSurvey, undefined, module[0].categoryType).then(function(questions){
					$scope.questions = questions;
				});
			}
		});
	});	

}]);