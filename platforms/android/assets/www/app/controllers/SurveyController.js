(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('SurveyController', SurveyController);

    SurveyController.$inject = ['$scope', '$route', '$location', 'Survey', 'Login', 'Question', '$routeParams', '$q'];
    function SurveyController($scope, $route, $location, Survey, Login, Question, $routeParams, $q) {
        var vm = this;       
        
        var closeSurvey = function(coaching_compliance, auditId, is_dashboard){
            Survey.closeSurvey(coaching_compliance).then(function(){		
                
                if(is_dashboard){
                    $location.path('/Dashboard/' + auditId);                                                                                                              
                }
                else{
                    $location.path('/Main');                    
                }				                
            });             
        };        
                  
        var closeAudit = function(){            

            var auditId = $routeParams.auditId;   
            var channelId = $routeParams.channelId;
                    
     		Survey.disableAuditMode();            
             
            Question.getCoachingQuestionsPerUserRolesCount(Login.getToken().id_role)
                .then(function (coachingQuestions) {          
                              
                    Survey.getPendingSurvey().then(function (survey) {
                        
                        Survey.getCoachingSurveyQuestionsCount(survey.id)
                            .then(function (auditCoachingQuestions) {                                                          
                                var coaching_compliance = 0;
                                
                                if(coachingQuestions === auditCoachingQuestions){
                                    coaching_compliance = 1;
                                }                         
                                
                                //Calculate Weights
                                Question.getBaseWeightPerModule(Login.getToken().id_role, channelId, survey.id)
                                    .then(function (baseWeights) {                                                                                
                                        
                                        if(baseWeights.length > 0){
                                            angular.forEach(baseWeights, function (value, key) {
                                                
                                                var promises = [];
                                                
                                                Question.getModulePercentageByWeight(survey.id, value.moduleId, value.base)
                                                    .then(function (modulePercentage) {                                                                                                                                                                                                                
                                                        promises.push(
                                                            Survey.setAuditFinalValues
                                                                (
                                                                    survey.id, 
                                                                    value.moduleId, 
                                                                    value.modName, 
                                                                    modulePercentage.ModulePercentage === null ? 
                                                                        0 : 
                                                                        modulePercentage.ModulePercentage, 
                                                                    value.icon, 
                                                                    auditId
                                                                )
                                                        );                                                                                                     
                                                    });
                                                
                                                $q.all(promises).then(function () {
                                                    //Close Survey                                                
                                                    vm.closeSurvey(coaching_compliance, auditId, true);                                        
                                                })
                                            });                                              
                                        }
                                        else{
                                              //Close Survey                                                
                                              vm.closeSurvey(coaching_compliance, auditId, false);
                                        }                                                                              
                                           
                                    });                                                                 
                            });                        
                    });                   
                        
                });    
        }

        activate();

        function activate() { 
            
        }
        
        vm.closeAudit = closeAudit;
        vm.closeSurvey = closeSurvey;
    }
})();