(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('WebSQLController', ControllerController);

    ControllerController.$inject = ['$scope', 'Database'];
    function ControllerController($scope, Database) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
        
        $scope.query;
        $scope.run = function () {
            console.log(
                Database.query($scope.query)
            );
        };
        
    }
})();