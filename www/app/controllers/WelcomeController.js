(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = [];
    function WelcomeController() {
        var vm = this;
        
        activate();

        function activate() { }
    }
})();