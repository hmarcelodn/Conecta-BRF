(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('QuestionsController', QuestionsController);

    QuestionsController.$inject = ['$scope', 'Survey', '$routeParams', 'Question', 'Category', 'Module'];
    function QuestionsController($scope, Survey, $routeParams, Question, Category, Module) {
        var vm = this;
        vm.currentCategory;
        vm.currentModule;
        $scope.questions = [];
        
        var binaryAction = function(question, answer){
            var result = { 
                value: answer 
            };

            Survey.getPendingSurvey().then(function(survey){
                Survey.setQuestionAnswer(survey.id, question.id, JSON.stringify(result)).then(function(){
                    question.JSONData = result;
                });
            });            
        };
        
        var undoBinaryAction = function(question){
            Survey.getPendingSurvey().then(function(survey){
                Survey.deleteQuestionAnswer(survey.id, question.id).then(function(){
                    question.JSONData = undefined;
                });
            });
        };
        
        var openAction = function(question){
            Survey.getPendingSurvey().then(function(survey){
                Survey.setQuestionAnswer(survey.id, question.id, JSON.stringify(question.JSONData)).then(function(){
                    return;
                });
            });			
        };

        var priceAction = function(question){
            Survey.getPendingSurvey().then(function(survey){
                Survey.setQuestionAnswer(survey.id, question.id, JSON.stringify(question.JSONData)).then(function(){
                    return;
                });
            });
        };

        var multipleAction = function(question){
            Survey.getPendingSurvey().then(function(survey){
                Survey.setQuestionAnswer(survey.id, question.id, JSON.stringify(question.config.answer_config.selected)).then(function(){
                    return;
                });
            });
        };        
        
        $scope.range = function(n){
            return new Array(n);
        };       

        function activate() { 
            if($routeParams.categoryId !== undefined){
                Survey.getPendingSurvey().then(function(pendingSurvey){

                    Category.getCategoryById($routeParams.categoryId)
                        .then(function (category){
                            vm.currentCategory = category;
                    });

                    Module.getModuleById($routeParams.moduleId)
                        .then(function (module){
                            vm.currentModule = module;
                        });
                    
                    Question.getQuestions($routeParams.moduleId, pendingSurvey.id, $routeParams.categoryId, $routeParams.categoryType)
                        .then(function(questions){
                            $scope.questions = questions;
                            console.log(questions);
                    });
                });
            }
            else{
                Module.getModuleById($routeParams.moduleId)
                    .then(function (module){
                    vm.currentModule = module;
                        
                    Survey.getPendingSurvey().then(function (pendingSurvey){
                        if(pendingSurvey !== undefined){
                            Question.getQuestions(module.moduleId, pendingSurvey.id, undefined, module.categoryType).then(function(questions){
                                $scope.questions = questions;
                            });
                        }
                        else{
                            Question.getQuestions($routeParams.moduleId, 0, undefined, module.categoryType).then(function(questions){
                                $scope.questions = questions;
                            });
                        }
                    });

                });			
            }            
        }
        
        vm.binaryAction = binaryAction;
        vm.undoBinaryAction = undoBinaryAction;
        vm.openAction = openAction;
        vm.priceAction = priceAction;
        vm.multipleAction = multipleAction;     
        
        activate();   
    }
})();