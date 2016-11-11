(function() {
    'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('MasterController', MasterController);

    MasterController.$inject = ['$scope', '$route', '$location', 'Login', 'Survey', '$routeParams', '$rootScope', 'Module', 'Customer', 'Database', '$timeout'];

    function MasterController($scope, $route, $location, Login, Survey, $routeParams, $rootScope, Module, Customer, Database, $timeout) {
        var vm = this;
        vm.username;
        vm.password;
        vm.routeParams;
        $scope.auditCustomerName;
        $scope.mainModules = [];
        $scope.loggedUserName = '';

        var loadMainModules = function() {
            Module.getMainModules().then(function(mainModules) {
                $scope.mainModules = mainModules;
                updateUserName();
            });
        };

        var loadModules = function() {
            //console.log("INN 999" + new Date());
            Module.getModules(Survey.getAuditChannel(), Login.getToken().id_role, Survey.getAuditId(), Survey.getAuditPdv()).then(function(modules) {
                $scope.modules = modules;

                if (Survey.getAuditMode() === true) {

                    Customer.getPdvById(Survey.getAuditPdv()).then(function(customer) {
                        //$scope.auditCustomerName = customer.pdvTypeName + ' - ' + customer.address;
                        $scope.auditCustomerName = customer.pdvTypeName + ' - ' + customer.code;
                    });

                }
            });

            /* Once Loaded all modules show Side Bar */
            $('.button-collapse').sideNav('show');
        };


        var getUserName = function() {
            if (!Login.authenticated()) {
                return "";
            }

            var token = Login.getToken();

            return token.name;
        };

        var updateUserName = function() {
            $scope.loggedUserName = vm.getUserName();
        };

        function activate() {

            //If logged.
            if (Login.authenticated()) {
                $location.path("/Main");

                updateUserName();
                vm.routeParams = $routeParams;

                Module.getMainModules().then(function(mainModules) {
                    loadMainModules();
                });
            }
        }

        $rootScope.$on('defaultModuleLoaded', function(event, data) {

            console.log('defaultModuleLoaded');

            Survey.getPendingSurvey().then(function(pendingSurvey) {
                if (pendingSurvey === undefined) {
                    vm.routeParams = data;

                    Customer.getPdvTypeByCustomerId(data.pdvId).then(function(customerPdvType) {
                        Survey.setSurvey(new Date().getTime().toString(), data.channelId, data.pdvId, data.sellerId, Login.getToken().id)
                            .then(function() {
                                Survey.enableAuditMode(data.channelId, data.pdvId, data.sellerId, data.auditId);
                                vm.loadModules();
                            });
                    });
                } else {
                    vm.loadModules();
                }
            });
        });

        $rootScope.$on('synchronizationSuccessfulyFinished', function(event, data) {
            console.log('Received Event synchronizationSuccessfulyFinished');
            loadMainModules();
        });

        $rootScope.$on('userLoggedOff', function() {
            console.log('userLoggedOff');
            // 20161111 -> Comente el localStorage.clear() porque hay usuarios a los que les  crashea la app
            //localStorage.clear();
            $scope.mainModules = [];
            $location.path("/");
        });

        $rootScope.$on('sendSyncFinished', function() {
            console.log('sendSyncFinished');
            $scope.mainModules = [];
            $location.path("/");
        });

        $rootScope.$on('closedSurvey', function(event, data) {
            console.log('closedSurvey');
            $scope.auditCustomerName = '';
        });

        $scope.authenticated = function() {
            return Login.authenticated();
        };

        $scope.isAuditModeEnabled = function() {
            return Survey.getAuditMode();
        };

        vm.loadModules = loadModules;
        vm.getUserName = getUserName;

        activate();
    }
})();