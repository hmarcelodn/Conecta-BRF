brfPhoneGapApp.controller('coachingController', [ '$scope', '$route', '$routeParams', 'Question', 'Survey', 'Module', '$rootScope',
	function($scope, $route, $routeParams, Question, Survey, Module, $rootScope){	

	$scope.routeParams = $routeParams;

	Module.getModuleByName('Coaching Supervisor').then(function(module){

		console.log("Emit Default Module Loaded Event");
		$rootScope.$emit('defaultModuleLoaded');			

		Survey.getPendingSurvey().then(function (pendingSurvey){
			if(pendingSurvey !== undefined){
				Question.getQuestions(module.moduleId, pendingSurvey.id, undefined, module.categoryType).then(function(questions){
					$scope.questions = questions;
				});
			}
			else{
				Question.getQuestions(module.moduleId, 0, undefined, module.categoryType).then(function(questions){
					$scope.questions = questions;
				});
			}
		});

	});

}]);