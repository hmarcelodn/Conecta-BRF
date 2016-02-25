(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('SynchronizerController', SynchronizerController);

    SynchronizerController.$inject = ['$routeParams', '$location', '$scope'];
    function SynchronizerController($routeParams, $location, $scope) {
        var vm = this;
        $scope.syncRoute;

        activate();

        function activate() { 
            if(parseInt($routeParams.syncModeId) === 1){
                $scope.syncRoute = '#/DoSynchronization';
            }
            else{                
                $scope.syncRoute = '#/SendSynchronization';
            }
        }
    }
})();