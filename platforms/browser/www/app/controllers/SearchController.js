(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', '$route', '$routeParams', 'Seller', 'Module', 'Login', 'Survey'];
    function SearchController($scope, $route, $routeParams, Seller, Module, Login, Survey) {
        var vm = this;
        vm.lastSellerId;
        
        $scope.pdvId = $routeParams.pdvId;
        $scope.channelId = $routeParams.channelId;	
        $scope.auditId = $routeParams.auditId;
        $scope.defaultModuleSlug;
        vm.auditId;
    
        activate();

        function activate() { 
            //Get Default module to be redirected
            Module.getModules($scope.channelId, Login.getToken().id_role, $scope.auditId).then(function(modules){
                $scope.defaultModuleSlug = modules[0].slug;
            });

            Seller.getSellers($scope.channelId).then(function(sellers){
                $scope.sellers = sellers;		
            });	            
            
            vm.lastSellerId = Survey.getLastAuditSeller() === null ? undefined : Survey.getLastAuditSeller() ;
            vm.auditId = $routeParams.auditId;
        }
    }
})();