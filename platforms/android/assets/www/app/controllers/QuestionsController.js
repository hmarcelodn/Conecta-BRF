brfPhoneGapApp.controller('questionsController', [ '$scope', 'Survey', function($scope, Survey){

	$scope.binaryAction = function(question, answer){		

		var result = { 
			value: answer 
		};

		Survey.getPendingSurvey().then(function(survey){
			Survey.setQuestionAnswer(survey.id, question.id, JSON.stringify(result)).then(function(){
				question.JSONData = result;
			});
		});

	};

	$scope.undoBinaryAction = function(question){
		Survey.getPendingSurvey().then(function(survey){
			Survey.deleteQuestionAnswer(survey.id, question.id).then(function(){
				question.JSONData = undefined;
			});
		});
	};

	$scope.openAction = function(question){
		Survey.getPendingSurvey().then(function(survey){
			Survey.setQuestionAnswer(survey.id, question.id, JSON.stringify(question.JSONData)).then(function(){
				return;
			});
		});			
	};

	$scope.priceAction = function(question){
		Survey.getPendingSurvey().then(function(survey){
			Survey.setQuestionAnswer(survey.id, question.id, JSON.stringify(question.JSONData)).then(function(){
				return;
			});
		});
	};

	$scope.multipleAction = function(question){
		Survey.getPendingSurvey().then(function(survey){
			Survey.setQuestionAnswer(survey.id, question.id, JSON.stringify(question.config.answer_config.selected)).then(function(){
				return;
			});
		});
	};

	$scope.range = function(n){
		return new Array(n);
	};

}]);