brfPhoneGapApp.controller('observationsController', ['$scope', 'Survey', function($scope, Survey){
	
	Survey.getPendingSurvey().then(function(survey){
		Survey.getObservations(survey.id).then(function(observations){
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
		Survey.getPendingSurvey().then(function(survey){
			Survey.setObservations(survey.id, $scope.observations).then(function(){
				return;
			});
		});	
	};

}]);