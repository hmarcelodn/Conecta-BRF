(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('CoachingController', CoachingController);

    CoachingController.$inject = ['$scope', '$route', '$routeParams', 'Question', 'Survey', 'Module', '$rootScope'];
    function CoachingController($scope, $route, $routeParams, Question, Survey, Module, $rootScope) {
        var vm = this;
        
        activate();
        
        //////////////////
        
        function activate(params) {
            
        }        
    }
})();