brfPhoneGapApp.controller('noBrfController', ['$scope', 'Survey', function($scope, Survey){

	Survey.getPendingSurvey().then(function(survey){
		Survey.getNoBrf(survey.id).then(function(noBrfs){
			if(noBrfs.length === 0){
				$scope.noBrfStatus = false;
			}
			else{
				console.log(noBrfs[0].noBrf);
				$scope.noBrfStatus = (noBrfs[0].noBrf === 'true');
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