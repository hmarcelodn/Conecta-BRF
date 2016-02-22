(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('FormController', FormController);

    FormController.$inject = ['$scope', '$route', '$routeParams', 'Customer'];
    function FormController($scope, $route, $routeParams, Customer) {
        var vm = this;
        $scope.channelId;
        vm.customers = [];        

        function activate() { 
            $scope.channelId = $routeParams.channelId;
            
            Customer.getCustomers().then(function(customers){
                vm.customers = customers;
            });	            
        }
        
        activate();
    }
})();