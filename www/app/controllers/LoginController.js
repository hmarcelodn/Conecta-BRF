(function() {
    'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$route', '$location', 'Login', 'Survey', '$routeParams', '$rootScope', 'Module', 'Customer', 'Database'];
    function LoginController($scope, $route, $location, Login, Survey, $routeParams, $rootScope, Module, Customer, Database) {
        var vm = this;
        vm.username;
	    vm.password;
	    vm.routeParams;
        $scope.loggedUserName;
        $scope.mainModules = [];

        var loadMainModules = function () {
            Module.getMainModules().then(function (mainModules) {
                $scope.mainModules = mainModules;
            });          
        };  
        
        var loadModules = function (){
            Module.getModules(Survey.getAuditChannel(), Login.getToken().id_role, Survey.getAuditId()).then(function(modules){
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
        
        var getUserName = function(){
            if(!Login.authenticated()){
                return "";
            }

            var token = Login.getToken();

            return token.name;
        };  

        function activate() { 
            
            //If logged.
            if(Login.authenticated()){
                $location.path("/Main");
                
                $scope.loggedUserName = vm.getUserName();
                vm.routeParams = $routeParams;
                
                Module.getMainModules().then(function (mainModules) {
                    loadMainModules();
                });                
            }            
        }             
        
        $rootScope.$on('defaultModuleLoaded', function (event, data) {                        
            Survey.getPendingSurvey().then(function(pendingSurvey){
                if(pendingSurvey === undefined){        
                    Customer.getPdvTypeByCustomerId(vm.routeParams.pdvId).then(function (customerPdvType) {
                        Survey.setSurvey(new Date().getTime().toString(), vm.routeParams.channelId, customerPdvType.pdvType, vm.routeParams.sellerId, Login.getToken().id)
                            .then(function(){
                                Survey.enableAuditMode($routeParams.channelId, $routeParams.pdvId, $routeParams.sellerId, $routeParams.auditId);
                                vm.loadModules();
                        });                        
                    });                              
                }
                else{
                    vm.loadModules();
                }
            });            
        });	     
        
        $rootScope.$on('synchronizationSuccessfulyFinished', function (event, data) {
            console.log('Received Event synchronizationSuccessfulyFinished');
            loadMainModules();
        });           
        
        $rootScope.$on('userLoggedOff', function(){
           console.log('userLoggedOff');
           $scope.mainModules = [];
           $location.path("/");
        });
        
        $scope.authenticated = function(){
            return Login.authenticated();
        };
        
        $scope.isAuditModeEnabled = function (){
            return Survey.getAuditMode();
        };
        
        vm.loadModules = loadModules;
        vm.login = login;
        vm.getUserName = getUserName;
        
        activate();     
    }
})();
