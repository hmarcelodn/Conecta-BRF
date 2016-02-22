(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('PdvController', PdvController);

    PdvController.$inject = ['$scope', '$route', '$location', '$routeParams', 'Customer'];
    function PdvController($scope, $route, $location, $routeParams, Customer) {
        var vm = this;
        $scope.customerTypes = [];
        
        $scope.companyName;
    	$scope.identifier;
	    $scope.address;               
        
        var addPdv = function(){
            Customer.setCustomer(0, $scope.companyName, $scope.identifier, $scope.address, $scope.selectedCustomerType.id)
                    .then(function(){
                        $location.path('Channel/' + $routeParams.channelId + '/Pdv/0/Seller');
                    });            
        };

        function activate() { 
            Customer.getCustomerTypes().then(function(customerTypes){
                $scope.customerTypes = customerTypes;
                $scope.selectedCustomerType = $scope.customerTypes[0];
            });
        }
        
        vm.addPdv = addPdv;
        
        activate();
    }
})();