brfPhoneGapApp.controller('welcomeController', function($scope, $route, surveyService, loginService){
	
	$scope.timestamp = new Date().getTime();

	var data = 
	{
		main:{
			"id_user": loginService.getToken().id,
			"survey": $scope.timestamp,
			"token": "560a100abad225d5afdf4fc6e5334917"
		},
		config:{
			"id_channel": 1,
			"id_type_pdv": 1,
			"id_seller": 1
		},
		details:{
			"name": "test",
			"address": "test",
			"notes": "test"
		}
	};

	console.log(JSON.stringify(data));

	/*
	surveyService.setSurvey($scope.timestamp, data, 0).then(function(){
		console.log("new survey added!");
	});*/

});