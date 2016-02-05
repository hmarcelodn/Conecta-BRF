brfPhoneGapApp.controller('noBrfController', ['$scope', 'Survey', function($scope, Survey){

	Survey.getPendingSurvey().then(function(survey){
		Survey.getNoBrf(survey.id).then(function(noBrfs){
			if(noBrfs === undefined){
				$scope.noBrfStatus = false;
			}
			else{
				$scope.noBrfStatus = (noBrfs.noBrf === 'true');
			}
		});
	});	

	$scope.noBrfChanged = function(){
		Survey.getPendingSurvey().then(function(survey){
			Survey.setNoBrf(survey.id, $scope.noBrfStatus).then(function(){
				return;
			});
		});		
	};

}]);