(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['$routeParams'];
    function WelcomeController($routeParams) {
        var vm = this;
        vm.auditId = $routeParams.auditId;
        
        activate();

        function activate() { }
    }
})();