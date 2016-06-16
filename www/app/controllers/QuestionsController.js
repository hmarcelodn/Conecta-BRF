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
        $scope.routeParams = $routeParams;
        
        var binaryAction = function(question, answer){
            var result = { 
                value: (answer == 1) ?true:(answer == 2)?"neutral":false 
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
                    updatePercents();
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
        
        function updatePercents(){

            /* Filter all has_percent questions */
            var percentQuestions = $scope.questions.filter(function(questionItem){
                return  questionItem.has_percent === 1;
            });


            var totalQuantity = 0;

            /* Calculate Total Quantities */
            angular.forEach(percentQuestions, function(questionItem){
                totalQuantity += (questionItem.JSONData.value === "" ? 0 : parseInt(questionItem.JSONData.value));
            });

            /* Calculate Total Quantities */
            angular.forEach(percentQuestions, function(questionItem){
                questionItem.percent = parseInt((questionItem.JSONData.value === "" ? 0: questionItem.JSONData.value / totalQuantity) * 100);
            });
        };

        $scope.range = function(n){
            return new Array(n);
        };       
        
        var openModal = function(){
             $('#modal1').openModal();
        };

        var openBigImageModal = function(question){
            $('#questionModal' + question.id).openModal();
        }

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
                            updatePercents();
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
                                updatePercents();
                            });
                        }
                        else{
                            Question.getQuestions($routeParams.moduleId, 0, undefined, module.categoryType).then(function(questions){
                                $scope.questions = questions;
                                updatePercents();
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
        vm.openModal = openModal;    
        vm.openBigImageModal = openBigImageModal;
        
        activate();   
    }
})();