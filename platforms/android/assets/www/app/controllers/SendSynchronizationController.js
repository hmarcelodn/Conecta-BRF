(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('SendSynchronizationController', SendSynchronizationController);

    SendSynchronizationController.$inject = ['$scope', 'Survey', '$location', '$q', 'Question'];
    function SendSynchronizationController($scope, Survey, $location, $q, Question) {
        var vm = this;
      
        $scope.syncSurveys = 0;
        $scope.syncNoBrf = 0;
        $scope.syncQuestions = 0;        
      
        activate();

        function activate() { 
            
            Survey.getClosedSurveys().then(function(surveys) {
                
               $scope.syncSurveys = 1;
                
               var deferred = $q.defer();               
               var promises = [];
               
               angular.forEach(surveys, function (value, key) {
                   promises.push(
                        Survey.informSurvey(
                            {
                                "data":
                                {
                                    "main":
                                    {
                                        "id_user": value.userId,
                                        "survey": value.survey,
                                        "token": "560a100abad225d5afdf4fc6e5334917"
                                    },
                                    "config":
                                    {
                                        "id_channel": value.channelId,
                                        "id_type_pdv": value.pdvId,
                                        "id_seller": value.sellerId
                                    },
                                    "details":
                                    {
                                        "name": "",
                                        "address": "",
                                        "notes": ""
                                    }                                    
                                }
                            }).then(function() {
                            deferred.resolve();
                        })
                        .catch(function (error) {
                            deferred.reject(error);
                        })
                   );
                   
                   $q.all(promises).then(function() {
                       $scope.syncSurveys = 2;
                       deferred.resolve();
                   })
               });
               
               return deferred.promise; 
            })
            .then(function() {
               $scope.syncNoBrf = 1;
               var deferred = $q.defer();
               var promises = [];
               
               Survey.getClosedSurveysNoBrf().then(function (noBrfSurveys) {
                   angular.forEach(noBrfSurveys, function(value, key) {
                        promises.push
                        (
                            Survey.informNoBrfSurvey(
                                {
                                    "data":
                                    {
                                        "token": "560a100abad225d5afdf4fc6e5334917",
                                        "id_user": value.userId,
                                        "survey": value.survey                                        
                                    }
                                }
                            )
                        )
                   });
                   
                   $q.all(promises).then(function() {
                      $scope.syncNoBrf = 2;
                      deferred.resolve(); 
                   });
               });
               
               return deferred.promise;                                 
            })
            .then(function() {
               $scope.syncQuestions = 1;               
               
               var deferred = $q.defer();
               var promises = new Array();
               
                Survey.getClosedSurveys().then(function (surveys) {
                    
                    console.log(surveys);
                    
                   angular.forEach(surveys, function (value, key) {                                            
                     Question.getQuestionsBySurveyId(value.id).then(function (questions) {
                        promises.push(Survey.informSurveyQuestions
                        (
                            {
                                "data":
                                {
                                    "main":
                                    {
                                        "survey": value.survey,
                                        "token": "560a100abad225d5afdf4fc6e5334917"
                                    },
                                    "results":
                                    {
                                        "questions": questions
                                    }
                                }
                            }
                        ));            
                     });
                   });
                });                                                        
               
               $q.all(promises).then(function () {
                  $scope.syncQuestions = 2;
                  deferred.resolve();
               });
               
               return deferred.promise;                 
            })
            .catch(function (error) {
                console.log(error);
                $location.path('/SyncNok');
            });            
        }
    }
})();