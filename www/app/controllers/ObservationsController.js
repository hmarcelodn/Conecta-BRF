brfPhoneGapApp.controller('observationsController', function($scope, surveyService){
	
	surveyService.getPendingSurvey().then(function(survey){
		surveyService.getObservations(survey.id).then(function(observations){
			if(observations.length === 0){
				$scope.observations = '';
			}
			else{
				console.log(observations);
				$scope.observations = observations[0].observations;
			}
		});
	});	

	$scope.observations;

	$scope.observationsChanged = function(){
		surveyService.getPendingSurvey().then(function(survey){
			surveyService.setObservations(survey.id, $scope.observations).then(function(){
				return;
			});
		});	
	};

});