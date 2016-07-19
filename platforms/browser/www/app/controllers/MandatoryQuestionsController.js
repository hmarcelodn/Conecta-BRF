(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('MandatoryQuestionsController', MandatoryQuestionsController);

    MandatoryQuestionsController.$inject = ['Question', '$scope', 'Login', 'Survey', '$q', '$routeParams'];
    function MandatoryQuestionsController(Question, $scope, Login, Survey, $q, $routeParams) {
        var vm = this;        
        vm.routeParams = $routeParams;
        
        activate();

        function activate() { 
            
            var roleId = Login.getToken().id_role;
            
            Survey.getPendingSurvey().then(function(pendingSurvey){

                $q.all([
                    Question.getMandatoryQuestions(pendingSurvey.id, roleId, $routeParams.channelId, $routeParams.auditId, $routeParams.pdvId),
                    Question.getSuggestedQuestions(pendingSurvey.id, roleId, $routeParams.channelId, $routeParams.auditId, $routeParams.pdvId)
                ])
                .then(function(data){
                    $scope.mandatoryQuestions = data[0];
                    $scope.suggestedQuestions = data[1];
                });                
            });            
        }
        
        var closeSurvey = function(){            
            Survey.getPendingSurvey().then(function(pendingSurvey){
               Survey.closeSurvey(Login.getToken().id_role, $routeParams.channelId, pendingSurvey.id, $routeParams.auditId); 
            });            
        };
        
        vm.closeSurvey = closeSurvey;
    }
})();