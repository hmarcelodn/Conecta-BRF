(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$route'];
    function MainController($scope, $route) {
        var vm = this;
        
        activate();

        function activate() { }
    }
})();