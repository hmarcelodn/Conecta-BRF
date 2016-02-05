brfPhoneGapApp.controller('questionsController', [ '$scope', 'Survey', '$routeParams', 'Question', 'Category', 'Module',
	function($scope, Survey, $routeParams, Question, Category, Module){

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

	if($routeParams.categoryId !== undefined){
		Survey.getPendingSurvey().then(function(pendingSurvey){

			Category.getCategoryById($routeParams.categoryId)
				.then(function (category){
					$scope.currentCategory = category;
			});

			Module.getModuleById($routeParams.moduleId)
				.then(function (module){
					$scope.currentModule = module;
				});
			
			Question.getQuestions($routeParams.moduleId, pendingSurvey.id, $routeParams.categoryId, $routeParams.categoryType)
				.then(function(questions){
					$scope.questions = questions;
			});
		});
	}
	else{
		Module.getModuleById($routeParams.moduleId)
			.then(function (module){
				$scope.currentModule = module;
				
				Question.getQuestions($routeParams.moduleId, 0, undefined, module.categoryType)
						.then(function(questions){
					$scope.questions = questions;
				});	
		});			
	}

}]);