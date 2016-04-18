(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('ExecutionController', ExecutionController);

    ExecutionController.$inject = ['$scope', '$route', '$routeParams', 'Question', 'Module', 'Survey'];
    function ExecutionController($scope, $route, $routeParams, Question, Module, Survey) {
        var vm = this;        

        activate();

        function activate() {                        
        }
    }
})();