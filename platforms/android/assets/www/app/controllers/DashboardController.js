brfPhoneGapApp.controller('dashboardController', function($scope, $route, Dashboard, Question, $routeParams, Login, Survey){
    $scope.selectedDating;
    $scope.modules = [];
    
    Dashboard.getDatings().then(function (datings) {                      
        $scope.datings = datings;                     
    });
    
    Survey.getVisitedCoachingPdvsCount(Login.getToken().id)
        .then(function (result) {
            console.log("Resultados:");
            console.log(result);
            $scope.visitedPDVs = (result === undefined ? 0 : result);
 
             
             Dashboard.getDailyBase(Login.getToken().id)
                .then(function (base) {
                    $scope.obtainedCompliance = Math.round((result / base.target_coaching) * 100);
                    $scope.progressStyle = { width: $scope.obtainedCompliance + "%" };
                    $scope.target = base;
                });           
        });
        
	Survey.getAveragePerModule($routeParams.auditId)
        .then(function (values) {
            
            console.log("test 1");
            console.log(values);
                        
            angular.forEach(values, function (value, key) {
                console.log($routeParams.auditId);
                
                Question.getAuditedQuestionsResume(value.id_mod, $routeParams.auditId)
                    .then(function (questionsResult1) {

                        console.log("test 2");
                        console.log(questionsResult1);                        

                        $scope.modules.push
                        ( {
                            percents: value,
                            points: questionsResult1        
                        } );
                        
                    });                
            });
        });
    	
});