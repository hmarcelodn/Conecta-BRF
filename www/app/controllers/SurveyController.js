(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('SurveyController', SurveyController);

    SurveyController.$inject = ['$scope', '$route', '$location', 'Survey', 'Login', 'Question', '$routeParams'];
    function SurveyController($scope, $route, $location, Survey, Login, Question, $routeParams) {
        var vm = this;                 
        
        console.log($routeParams);     
        
        var closeAudit = function(){            

            var auditId = $routeParams.auditId;   
                    
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
                                console.log('getCurrentAuditQuestionsWeight');
                                Question.getCurrentAuditQuestionsWeight(survey.id)
                                    .then(function (weight) {
                                        
                                        if(weight === 0){
                                            //Close Survey
                                            Survey.closeSurvey(coaching_compliance).then(function(){						
                                                $location.path('/Dashboard/' + auditId);                                                                                          
                                            });                                                                                      
                                        }
                                        
                                        var weightPercent = (100 / weight.totalWeight);                                       
                                        
                                        Question.getCalcultedTotalWeight(weightPercent)
                                            .then(function (moduleQuestions) {       
                                                
                                                //Set Modules results
                                                angular.forEach(moduleQuestions, function (value, key) {                                                    
                                                    Survey.setAuditFinalValues(survey.id, value.moduleId, value.modName, value.finalValue, value.icon, auditId);                                                      
                                                });                                                  
                                                
                                                //Close Survey
                                                Survey.closeSurvey(coaching_compliance).then(function(){						
                                                    $location.path('/Dashboard/' + auditId);
                                                });  
                                            });    
                                    });                                                                 
                            });                        
                    });                   
                        
                });    
        }

        activate();

        function activate() { 
            
        }
        
        vm.closeAudit = closeAudit;
    }
})();