brfPhoneGapApp.controller('pricesController', ['$scope', '$routeParams', 'Question', 'Module', 'Survey' ,
	function($scope, $routeParams, Question, Module, Survey){

	Module.getModuleByName('Toma de Precios').then(function(module){
		Survey.getPendingSurvey().then(function(pendingSurvey){
			Question.getQuestions(module.moduleId, pendingSurvey.id, $routeParams.categoryId, module.categoryType).then(function(questions){
				$scope.questions = questions;
			});
		});
	});	
	
}]);