(function() {
    'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('SynchronizerController', SynchronizerController);

    SynchronizerController.$inject = ['$routeParams', '$location', '$scope', 'Target', 'Survey', '$q', 'Login', '$rootScope'];

    function SynchronizerController($routeParams, $location, $scope, Target, Survey, $q, Login, $rootScope) {
        var vm = this;
        $scope.syncRoute;

        //LUUU 
        $scope.ShowSelectPDVChains = 0;
        $scope.ShowSelectPDVDis = 0;

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

        //LUU END

        activate();

        function activate() {
            $scope.syncModeId = parseInt($routeParams.syncModeId);
            $scope.buttonText = $scope.syncModeId === 1 ? 'COMENZAR SINCRONIZACION' : 'ENVIAR DATOS';

            var allowedPDVChains = Login.getToken().chains;
            var allowedPDVDis = Login.getToken().dis;

            ///LUUU
            if (allowedPDVChains.length === 1 || Login.getToken().can_change_chains == 0) {
                $scope.ShowSelectPDVChains = 0;
                angular.forEach(allowedPDVChains, function(value, key) {
                    this.push(value.id);
                }, $scope.selectedChains);

            } else {
                $scope.ShowSelectPDVChains = 1;
                $scope.PDVChains = allowedPDVChains; //Login.getToken().chains; //availablePDVChains;
                $scope.ChainCount = allowedPDVChains.length;
                $scope.CanChangeChain = Login.getToken().can_change_chains;
            }

            if (allowedPDVDis.length === 1 || Login.getToken().can_change_dis == 0) {
                $scope.ShowSelectPDVDis = 0;
                angular.forEach(allowedPDVDis, function(value, key) {
                    this.push(value.id);
                }, $scope.selectedDis);
            } else {
                $scope.ShowSelectPDVDis = 1;
                $scope.PDVDis = allowedPDVDis;
                $scope.DisCount = allowedPDVDis.length;
                $scope.CanChangeDis = Login.getToken().can_change_dis;
            }

            if (parseInt($routeParams.syncModeId) === 1) {
                $scope.syncRoute = '#/DoSynchronization';
            } else {

                $q.all([
                        Survey.getCoachingComplianceSurvey(),
                        Target.getTargetCoaching()
                    ])
                    .then(function(data) {
                        var coachingCompliance = data[0];
                        var userCoachingCompliance = data[1];
                        //

                        if (coachingCompliance.length < userCoachingCompliance.target_coaching) {
                            $rootScope.MainModuleId = 0;
                            if (coachingCompliance.length > 0) {
                                $rootScope.MainModuleId = coachingCompliance[0].id;
                                //console.log("IN");
                                //console.log(coachingCompliance);
                                //console.log(coachingCompliance[0].id);
                                //console.log("//END");
                                if (coachingCompliance[0].id == 1) {
                                    console.log("IN LOCK");
                                    $scope.syncRoute = '#/LockSynchronization/' + (parseInt(userCoachingCompliance.target_coaching) - coachingCompliance.length).toString();
                                } else {
                                    console.log("OUT LOCK");
                                    $scope.syncRoute = '#/SendSynchronization';
                                }
                            } else {
                                console.log("IN LOCK2");
                                $scope.syncRoute = '#/LockSynchronization/' + (parseInt(userCoachingCompliance.target_coaching) - coachingCompliance.length).toString();
                            }
                        } else {
                            $rootScope.MainModuleId = 0;
                            console.log("IN SendSync");
                            $scope.syncRoute = '#/SendSynchronization';
                        }
                    });
            }

        }
    }
})();