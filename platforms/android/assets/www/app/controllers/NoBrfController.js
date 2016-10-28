(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('NoBrfController', NoBrfController);

    NoBrfController.$inject = ['$scope', 'Survey'];
    function NoBrfController($scope, Survey) {
        var vm = this;
        
        activate();

        function activate() { 

            $scope.noBrfChanged = function(){
                Survey.getPendingSurvey().then(function(survey){
                    Survey.setNoBrf(survey.id, $scope.noBrfStatus).then(function(){
                        return;
                    });
                });		
            };            
        }
    }
})();