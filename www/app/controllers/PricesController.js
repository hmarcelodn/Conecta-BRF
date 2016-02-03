brfPhoneGapApp.controller('pricesController', ['$scope', '$routeParams', 'Question', 'Module', 'Survey' ,
	function($scope, $routeParams, Question, Module, Survey){

	Module.getModuleByName('Toma de Precios').then(function(module){
		Survey.getPendingSurvey().then(function(pendingSurvey){
			Question.getQuestions(module[0].moduleId, pendingSurvey.id, $routeParams.categoryId, module[0].categoryType).then(function(questions){
				$scope.questions = questions;
			});
		});
	});	
	
}]);