(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('PricesController', PricesController);

    PricesController.$inject = ['$scope', '$routeParams', 'Question', 'Module', 'Survey'];
    function PricesController($scope, $routeParams, Question, Module, Survey) {
        var vm = this;
        
        activate();

        function activate() { 

            // TODO: Refactor getModuleBySlug instead
            Module.getModuleByName('Toma de Precios').then(function(module){
                Survey.getPendingSurvey().then(function(pendingSurvey){
                    Question.getQuestions(module.moduleId, pendingSurvey.id, $routeParams.categoryId, module.categoryType).then(function(questions){
                        $scope.questions = questions;
                    });
                });
            });	            
        }
    }
})();