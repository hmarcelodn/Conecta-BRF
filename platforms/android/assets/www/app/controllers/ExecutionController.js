brfPhoneGapApp.controller('executionController', ['$scope', '$route', '$routeParams', 'Question', 'Module', 'Survey', 
	function($scope, $route, $routeParams, Question, Module, Survey){
	
	Module.getModuleByName('Ejecución PDV').then(function(module){
		Survey.getPendingSurvey().then(function(pendingSurvey){
			if($routeParams.categoryId !== undefined){
				console.log("fu1");
				Question.getQuestions(module.moduleId, pendingSurvey.id, $routeParams.categoryId).then(function(questions){
					$scope.questions = questions;
				});
			}
			else{
				Question.getQuestions(module.moduleId, pendingSurvey.id, undefined, module.categoryType).then(function(questions){
					$scope.questions = questions;
				});
			}
		});
	});	

}]);