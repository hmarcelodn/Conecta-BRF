(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('ExecutionController', ExecutionController);

    ExecutionController.$inject = ['$scope', '$route', '$routeParams', 'Question', 'Module', 'Survey'];
    function ExecutionController($scope, $route, $routeParams, Question, Module, Survey) {
        var vm = this;        

        activate();

        function activate() { 
                        
            console.log('Ejecución PDV');
            //TODO: Refactor Promises
            Module.getModuleByName('Ejecución PDV').then(function(module){
                Survey.getPendingSurvey().then(function(pendingSurvey){
                    if($routeParams.categoryId !== undefined){
                        Question.getQuestions(module.moduleId, pendingSurvey.id, $routeParams.categoryId).then(function(questions){
                            $scope.questions = questions;
                        });
                    }
                    else{
                        Question.getQuestions(module.moduleId, pendingSurvey.id, undefined, module.categoryType).then(function(questions){
                            $scope.questions = questions;
                        });
                    }
                });
            });	            
        }
    }
})();