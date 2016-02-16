brfPhoneGapApp.controller('observationsController', ['$scope', 'Survey', function($scope, Survey){
	
	Survey.getPendingSurvey().then(function(survey){
		Survey.getObservations(survey.id).then(function(observations){
			if(observations === undefined){
				$scope.observations = '';
			}
			else{
				$scope.observations = observations.observations;
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