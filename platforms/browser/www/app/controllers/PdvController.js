(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('PdvController', PdvController);

    PdvController.$inject = ['$scope', '$route', '$location', '$routeParams', 'Customer', 'Survey'];
    function PdvController($scope, $route, $location, $routeParams, Customer, Survey) {
        var vm = this;
        vm.lastPdvId;
        
        $scope.customerTypes = [];        
        $scope.companyName;
    	$scope.identifier;
	    $scope.address;               
        
        var addPdv = function(){
            Customer.setCustomer(0, $scope.companyName, $scope.identifier, $scope.address, $scope.selectedCustomerType.id)
                    .then(function(){
                        $location.path('/Audit/' + $routeParams.auditId + '/Channel/' + $routeParams.channelId + '/Pdv/0/Seller');
                    });            
        };

        function activate() { 
            Customer.getCustomerTypes().then(function(customerTypes){
                $scope.customerTypes = customerTypes;
                $scope.selectedCustomerType = $scope.customerTypes[0];
            });
            
            vm.lastPdvId = Survey.getLastAuditPdv() === null ? undefined : Survey.getLastAuditPdv();
        }
        
        vm.addPdv = addPdv;
        
        activate();
    }
})();