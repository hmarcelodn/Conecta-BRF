(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', '$route', '$routeParams', 'Seller', 'Module', 'Login'];
    function SearchController($scope, $route, $routeParams, Seller, Module, Login) {
        var vm = this;
        
        $scope.pdvId = $routeParams.pdvId;
        $scope.channelId = $routeParams.channelId;	
        $scope.defaultModuleSlug;
    
        activate();

        function activate() { 
            //Get Default module to be redirected
            Module.getDefaultModules($scope.channelId, Login.getToken().id_role).then(function (result){
                $scope.defaultModuleSlug = result.slug;
            });

            Seller.getSellers().then(function(sellers){
                $scope.sellers = sellers;		
            });	
        }
    }
})();