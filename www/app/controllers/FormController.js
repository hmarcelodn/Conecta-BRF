(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('FormController', FormController);

    FormController.$inject = ['$scope', '$route', '$routeParams', 'Customer', 'Survey'];
    function FormController($scope, $route, $routeParams, Customer, Survey) {
        var vm = this;
        $scope.channelId;
        vm.customers = [];        
        vm.lastPdvId;
        vm.auditId;

        function activate() { 
            $scope.channelId = $routeParams.channelId;
            
            Customer.getCustomers().then(function(customers){
                vm.customers = customers;
                vm.lastPdvId = Survey.getLastAuditPdv() === null ? undefined : Survey.getLastAuditPdv();
                vm.auditId = $routeParams.auditId;
            });	            
        }
        
        activate();
    }
})();