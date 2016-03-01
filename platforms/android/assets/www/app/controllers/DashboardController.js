brfPhoneGapApp.controller('dashboardController', function($scope, $route, Dashboard, Question, $routeParams, Login, Survey){
    $scope.selectedDating;
    $scope.modules = [];
    
    Dashboard.getDatings().then(function (datings) {                      
        $scope.datings = datings;                     
    });
    
    Survey.getVisitedCoachingPdvsCount(Login.getToken().id)
        .then(function (result) {
            $scope.visitedPDVs = result;
 
             Dashboard.getDailyBase(Login.getToken().id)
                .then(function (base) {
                    $scope.obtainedCompliance = Math.round((result / base.target_coaching) * 100);
                    $scope.progressStyle = { width: $scope.obtainedCompliance + "%" };
                    $scope.target = base;
                });           
        });
    
    console.log($routeParams.auditId);
	Survey.getAveragePerModule($routeParams.auditId)
        .then(function (values) {
            angular.forEach(values, function (value, key) {
                console.log($routeParams.auditId);
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