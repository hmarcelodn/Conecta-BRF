brfPhoneGapApp.controller('dashboardController', function($scope, $route, Dashboard, Question, $routeParams, Login, Survey){
    $scope.selectedDating;
    $scope.modules = [];
    
    Dashboard.getDatings().then(function (datings) {                      
        $scope.datings = datings;                     
    });
    
    Survey.getVisitedCoachingPdvsCount(Login.getToken().id)
        .then(function (result) {
            $scope.visitedPDVs = (result === undefined ? 0 : result);
              
             Dashboard.getDailyBase(Login.getToken().id)
                .then(function (base) {
                    
                    if(base.target_coaching != 0){
                        $scope.obtainedCompliance = Math.round((result / base.target_coaching) * 100);
                        $scope.progressStyle = { width: $scope.obtainedCompliance + "%" };                        
                    }
                    
                    $scope.target = base.target_coaching;
                });           
        });
    
	Survey.getAveragePerModule($routeParams.auditId)
        .then(function (values) {           
                        
            angular.forEach(values, function (value, key) {
                
                Question.getAuditedQuestionsResume(value.id_mod, $routeParams.auditId)
                    .then(function (questionsResult1) {                      

                        $scope.modules.push
                        ( {
                            percents: value,
                            points: questionsResult1        
                        } );
                        
                    });                
            });
        });
    	
});