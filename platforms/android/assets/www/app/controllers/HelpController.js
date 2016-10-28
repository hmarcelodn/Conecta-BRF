(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('HelpController', HelpController);

    HelpController.$inject = ['$scope', '$routeParams', 'Question'];
    function HelpController($scope, $routeParams, Question) {
        var vm = this;
        
        activate();

        function activate() { 
            Question.getQuestionById($routeParams.questionId)
                .then(function (question) {
                    $scope.title = question.title;
                    $scope.helpBody = question.helper;
                });
        }
    }
})();