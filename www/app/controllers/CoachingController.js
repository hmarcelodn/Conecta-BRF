brfPhoneGapApp.controller('coachingController', [ '$scope', '$route', '$routeParams', 'Question', 'Survey', 'Module', '$rootScope',
	function($scope, $route, $routeParams, Question, Survey, Module, $rootScope){	

	$scope.routeParams = $routeParams;

	Module.getModuleByName('Coaching Supervisor').then(function(module){

		/* Recursive Method */
		var getQuestions = function(){
			Survey.getPendingSurvey().then(function(pendingSurvey){
				if(pendingSurvey === undefined){
					Survey.setSurvey(new Date().getTime().toString()).then(function(){
						Survey.enableAuditMode($routeParams.channelId, $routeParams.pdvId, $routeParams.sellerId);
						getQuestions();
					})
					.catch(function(error){
						Survey.disableAuditMode();
					});	
				}
				else{
					console.log(pendingSurvey);
					Question.getQuestions(module.moduleId, pendingSurvey.id, undefined, module.categoryType).then(function(questions){
						$scope.questions = questions;
						$rootScope.$emit('auditModeEnabled'); //Communicates upwards an audit started
					});
				}			

			});
		};

		/* Call Recursive Method */
		getQuestions();

	});

}]);