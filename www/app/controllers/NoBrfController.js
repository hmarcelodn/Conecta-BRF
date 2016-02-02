brfPhoneGapApp.controller('noBrfController', function($scope, surveyService){

	surveyService.getPendingSurvey().then(function(survey){
		surveyService.getNoBrf(survey.id).then(function(noBrfs){
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
		surveyService.getPendingSurvey().then(function(survey){
			surveyService.setNoBrf(survey.id, $scope.noBrfStatus).then(function(){
				return;
			});
		});		
	};

});