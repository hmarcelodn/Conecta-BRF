(function() {
    'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$route', '$location', 'Login', 'Survey', '$routeParams', '$rootScope', 'Module', 'Customer'];
    function LoginController($scope, $route, $location, Login, Survey, $routeParams, $rootScope, Module, Customer) {
        var vm = this;
        vm.username;
	    vm.password;
	    vm.routeParams;
        vm.loggedUserName;

        function activate() { 
            if(Login.authenticated()){
                $location.path("/Main");
            }
            
            vm.loggedUserName = vm.getUserName();
            vm.routeParams = $routeParams;
        }       
        
        var loadModules = function (){
            Module.getModules(Survey.getAuditChannel(), Login.getToken().id_role).then(function(modules){
                $scope.modules = modules;
            });
        };        
        
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
        
        var logout = function(){
            Login.authenticate(undefined);
            $location.path("/");   
        };       
        
        var getUserName = function(){
            if(!Login.authenticated()){
                return "";
            }

            var token = Login.getToken();

            return token.name;
        };  
        
        $rootScope.$on('defaultModuleLoaded', function (event, data) {            
            
            Survey.getPendingSurvey().then(function(pendingSurvey){
                if(pendingSurvey === undefined){          
                    Customer.getPdvTypeByCustomerId(vm.routeParams.pdvId).then(function (customerPdvType) {
                        Survey.setSurvey(new Date().getTime().toString(), vm.routeParams.channelId, customerPdvType.pdvType, vm.routeParams.sellerId, Login.getToken().id)
                            .then(function(){
                                Survey.enableAuditMode($routeParams.channelId, $routeParams.pdvId, $routeParams.sellerId);
                                vm.loadModules();
                        });                        
                    });                              
                }
                else{
                    vm.loadModules();
                }
            });
        });	        
        
        $scope.authenticated = function(){
            return Login.authenticated();
        };
        
        $scope.isAuditModeEnabled = function (){
            return Survey.getAuditMode();
        };
        
        vm.loadModules = loadModules;
        vm.login = login;
        vm.logout = logout;
        vm.getUserName = getUserName;
        
        activate();     
    }
})();
