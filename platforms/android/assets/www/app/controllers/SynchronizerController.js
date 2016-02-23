(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('SynchronizerController', SynchronizerController);

    SynchronizerController.$inject = ['$routeParams', '$location'];
    function SynchronizerController($routeParams, $location) {
        var vm = this;
        vm.syncRoute = '';
        
        var navigateToSync = function(){
            $location.path(vm.syncRoute);
        };
        
        vm.navigateToSync = navigateToSync;

        activate();

        function activate() { 
            if($routeParams.syncModeId === 0){
                vm.syncRoute = '/DoSynchronization';
            }
            else{
                vm.syncRoute = '/SendSynchronization';
            }
        }
    }
})();