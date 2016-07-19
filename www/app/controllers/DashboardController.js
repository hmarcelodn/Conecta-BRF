(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$route', 'Dashboard', 'Question', '$routeParams', 'Login', 'Survey', '$q'];
    function DashboardController($scope, $route, Dashboard, Question, $routeParams, Login, Survey, $q) {
        var vm = this;
        $scope.selectedDating;
        $scope.modules = [];

        activate();

        ////////////////

        function activate() { 
            Dashboard.getDatings().then(function (datings) {                      
                $scope.datings = datings;                     
            });
            
                
            $q.all([
                    Survey.getVisitedCoachingPdvsCount(Login.getToken().id),
                    Dashboard.getDailyBase(Login.getToken().id)
                ]).then(function (data) {
                    var result = data[0];
                    var base = data[1];
                    
                    $scope.visitedPDVs = (result === undefined ? 0 : result);
                    
                    if(base.target_coaching != 0){
                        $scope.obtainedCompliance = Math.round((result / base.target_coaching) * 100);
                        $scope.progressStyle = { width: $scope.obtainedCompliance + "%" };                        
                    }
                            
                    $scope.target = base.target_coaching;
            });

            Survey.getAveragePerModule($routeParams.auditId)
                .then(function (values) {                                               
                    angular.forEach(values, function (value, key) {                            
                            Question.getAuditedQuestionsResume(value.id_mod, $routeParams.auditId, value.id_mod, $routeParams.auditId)
                                .then(function (questionsResult1) {                      
                                    $scope.modules.push
                                    ( {
                                        percents: value,
                                        points: questionsResult1     
                                    } );                                    
                                });                
                        });
                    });                         
        }
    }
})();