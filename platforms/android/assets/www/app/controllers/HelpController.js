(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('HelpController', HelpController);

    HelpController.$inject = ['$routeParams'];
    function HelpController() {
        var vm = this;
        
        activate();

        function activate() { }
    }
})();