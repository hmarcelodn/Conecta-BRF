(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('SurveyController', SurveyController);

    SurveyController.$inject = ['$scope', '$route', '$location', 'Survey', 'Login', 'Question', '$routeParams', '$q', '$rootScope'];
    function SurveyController($scope, $route, $location, Survey, Login, Question, $routeParams, $q, $rootScope) {
        var vm = this;       
        vm.routeParams = $routeParams;        
                  
        var closeAudit = function(){            

            var auditId = $routeParams.auditId;   
            var channelId = $routeParams.channelId;
            var pdvId = $routeParams.pdvId;
            var sellerId = $routeParams.sellerId;
            var roleId = Login.getToken().id_role;  
                   
            
             Survey.getPendingSurvey().then(function (pendingSurvey) {
                //Check Mandatories + Suggested Questions Before Closing Survey
                $q.all([
                    Question.getMandatoryQuestions(pendingSurvey.id, roleId, channelId, auditId, pdvId),
                    Question.getSuggestedQuestions(pendingSurvey.id, roleId, channelId, auditId, pdvId)
                ]).then(function (data) {

                    var mandatoryQuestions = data[0];
                    var suggestedQuestions = data[1];                                   
                    
                    //With Pending Questions Go to Mandatory Page
                    if(mandatoryQuestions.length > 0 || suggestedQuestions.length > 0){
                        $location.path(
                            '/Audit/' + auditId +
                            '/Channel/' + channelId +
                            '/Pdv/' + pdvId +  
                            '/Seller/' + sellerId +
                            '/Mandatory');
                    }                
                    else{
                        Survey.closeSurvey(roleId, channelId, pendingSurvey.id, auditId);                 
                    }
                });                  
             });                                  
        };

        var cancelAudit = function(){
            
            Survey.disableAuditMode();

            Survey.getPendingSurvey().then(function (pendingSurvey) {                
                $q.all([
                        Survey.deleteSurveyNoBrfResults(pendingSurvey.id),
                        Survey.deleteSurveyObservationResults(pendingSurvey.id),
                        Survey.deleteSurveyQuestionsResults(pendingSurvey.id),
                        Survey.deleteSurvey(pendingSurvey.id)
                    ]).then(function(){          
                        //Survey.disableAuditMode();          
                        $location.path('/Main');
                    }); 
            });           
        };

        activate();

        function activate() { 
            
        }
        
        vm.closeAudit = closeAudit;
        vm.cancelAudit = cancelAudit;
    }
})();