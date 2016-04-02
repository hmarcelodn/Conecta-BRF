(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('LockSynchronizationController', LockSynchronizationController);

    LockSynchronizationController.$inject = ['$routeParams', '$scope'];
    function LockSynchronizationController($routeParams, $scope) {
        var vm = this;        

        activate();

        function activate() { 
            $scope.leftCoaching = $routeParams.leftCoaching
        }
    }
})();