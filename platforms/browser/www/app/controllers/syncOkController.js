(function() {
    'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('SyncOkController', SyncOkController);

    SyncOkController.$inject = ['$routeParams', '$scope', '$rootScope'];

    function SyncOkController($routeParams, $scope, $rootScope) {
        var vm = this;

        activate();

        function activate() {
            $scope.syncId = parseInt($routeParams.syncId);
            $scope.leftCoaching = $rootScope.leftCoaching;
            $scope.YO = 11;
            console.log("SEND");
            console.log($scope.leftCoaching);
            console.log("END");
        }
    }
})();