(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('SendSynchronizationController', SendSynchronizationController);

    SendSynchronizationController.$inject = ['$scope'];
    function SendSynchronizationController($scope) {
        var vm = this;
      
        $scope.syncSurveys = 0;
        $scope.syncNoBrf = 0;
        $scope.syncQuestions = 0;        
      
        activate();

        function activate() { 
            
        }
    }
})();