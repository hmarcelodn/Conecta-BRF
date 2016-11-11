(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('BeforeLogOffController', BeforeLogOffController);

    BeforeLogOffController.$inject = ['Database', 'Login', '$location', '$scope', '$timeout', '$rootScope'];
    function BeforeLogOffController(Database, Login, $location, $scope, $timeout, $rootScope) {
        var vm = this;      
        $scope.isLoggingOff = 0;
        
        var logout = function(){   
            $scope.isLoggingOff = 1;
            // 20161111 -> Comente el dropAll porque hay usuarios a los que les  crashea la app
            //Database.dropAll().then(function(){                
                Login.authenticate(undefined);                              
                $rootScope.$emit('userLoggedOff');
            //});             
        };   

        activate();

        ////////////////

        function activate() { }
        
        vm.logout = logout;
       
    }
})();