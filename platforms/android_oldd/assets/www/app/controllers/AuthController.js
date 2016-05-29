(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['$scope', '$route', '$location','Login'];
    function AuthController($scope, $route, $location, Login) {
        var vm = this;
        
        var login = function (){            
            Login.validateUser(vm.username, vm.password).then(function(response){        
                if(typeof response.data === 'string'){
                    if(response.data.trim() === 'false'){
                        vm.username = '';
                        vm.password = '';
                    }
                }
                else if(typeof response.data === 'object'){                    
                    Login.authenticate(response.data);                    

                    $location.path("/Main");
                }
            });            
        };  

        activate();

        function activate() { }

        vm.login = login;
    }
})();