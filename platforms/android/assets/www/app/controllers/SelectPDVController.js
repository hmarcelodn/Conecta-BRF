(function() {
    'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('SelectPDVController', SelectPDVController);

    SelectPDVController.$inject = ['$routeParams', '$location', '$scope', 'Target', 'Survey', '$q', 'Login', '$rootScope'];

    function SelectPDVController($routeParams, $location, $scope, Target, Survey, $q, Login, $rootScope) {
        var vm = this;
        $scope.selectedChains = [];
        $scope.selectedDis = [];

        $scope.toggleChain = function(item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }
        };
        $scope.existsChain = function(item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.limitchains = function(list) {
            if (list.length < 1) {
                return false;
            } else {
                return true;
            }
        }

        $scope.toggleDis = function(item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }
        };
        $scope.existsDis = function(item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.limitdis = function(list) {
            if (list.length < 1) {
                return false;
            } else {
                return true;
            }
        }

        $rootScope.SelectedChains = $scope.selectedChains;
        $rootScope.SelectedDis = $scope.selectedDis;
        //$scope.$broadcast('SelectedDis', $scope.selectedDis);

        activate();

        function activate() {
            var allowedPDVChains = Login.getToken().chains;
            var allowedPDVDis = Login.getToken().dis;

            // Aqui verifico si puede cambiar los PDVChains
            // tambien si es uno solo ya seteo los unicos valores y procedo a syncronizar
            if ((allowedPDVChains.length === 1 && allowedPDVDis.length === 1) || (Login.getToken().can_change_chains == 0 && Login.getToken().can_change_dis == 0)) {
                angular.forEach(allowedPDVChains, function(value, key) {
                    this.push(value.id);
                }, $scope.selectedChains);

                console.log('test');
                console.log($scope.selectedChains);

                angular.forEach(allowedPDVDis, function(value, key) {
                    this.push(value.id);
                }, $scope.selectedDis);

                console.log('Dis');
                console.log($scope.selectedDis);

                $location.path('/DoSynchronization');
            } else {
                vm.PDVChains = allowedPDVChains; //Login.getToken().chains; //availablePDVChains;
                vm.PDVDis = allowedPDVDis;
                vm.ChainCount = allowedPDVChains.length;
                vm.CanChangeChain = Login.getToken().can_change_chains;
                vm.DisCount = allowedPDVDis.length;
                vm.CanChangeDis = Login.getToken().can_change_dis;
            }
        };

    }

})();