(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('SyncOkController', SyncOkController);

    SyncOkController.$inject = ['$routeParams', '$scope'];
    function SyncOkController($routeParams, $scope) {
        var vm = this;              

        activate();

        function activate() { 
        	$scope.syncId = parseInt($routeParams.syncId);
        }
    }
})();