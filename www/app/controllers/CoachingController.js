brfPhoneGapApp.controller('coachingController', [ '$scope', '$route', '$routeParams', 'Question', 'Survey', 'Module' ,
	function($scope, $route, $routeParams, Question, Survey, Module){	

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
					Question.getQuestions(module[0].moduleId, pendingSurvey.id, undefined, module[0].categoryType).then(function(questions){
						$scope.questions = questions;
					});
				}			

			});
		};

		/* Call Recursive Method */
		getQuestions();

	});

}]);