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

                Database.query($scope.query)
                    .then(function(result){
                        console.log(Database.fetchAll(result));
                    });
            
        };
        
    }
})();