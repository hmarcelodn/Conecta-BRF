(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('ObservationsController', ObservationsController);

    ObservationsController.$inject = ['$scope', 'Survey'];
    function ObservationsController($scope, Survey) {
        var vm = this;
        $scope.observations;
        
        activate();

        function activate() { 
            Survey.getPendingSurvey().then(function(survey){
                Survey.getObservations(survey.id).then(function(observations){
                    if(observations === undefined){
                        $scope.observations = '';
                    }
                    else{
                        $scope.observations = observations.observations;
                    }
                });
            });	

            $scope.observationsChanged = function(){
                Survey.getPendingSurvey().then(function(survey){

                    console.log(survey);

                    Survey.setObservations(survey.id, $scope.observations).then(function(){
                        return;
                    });
                });	
            };            
        }
    }
})();