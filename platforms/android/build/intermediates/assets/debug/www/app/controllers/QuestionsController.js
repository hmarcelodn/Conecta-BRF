brfPhoneGapApp.controller('questionsController', function($scope, surveyService){

	$scope.binaryAction = function(question, answer){		

		var result = { 
			value: answer 
		};

		surveyService.getPendingSurvey().then(function(survey){
			surveyService.setQuestionAnswer(survey.id, question.id, JSON.stringify(result)).then(function(){
				question.JSONData = result;
			});
		});

	};

	$scope.openAction = function(question){
		surveyService.getPendingSurvey().then(function(survey){
			surveyService.setQuestionAnswer(survey.id, question.id, JSON.stringify(question.JSONData)).then(function(){
				return;
			});
		});			
	};

	$scope.priceAction = function(question){
		surveyService.getPendingSurvey().then(function(survey){
			surveyService.setQuestionAnswer(survey.id, question.id, JSON.stringify(question.JSONData)).then(function(){
				return;
			});
		});
	};

	$scope.multipleAction = function(question){
		surveyService.getPendingSurvey().then(function(survey){
			surveyService.setQuestionAnswer(survey.id, question.id, JSON.stringify(question.config.answer_config.selected)).then(function(){
				return;
			});
		});
	};

	$scope.range = function(n){
		return new Array(n);
	};

});