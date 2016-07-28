(function() {
    'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('SynchronizerController', SynchronizerController);

    SynchronizerController.$inject = ['$routeParams', '$location', '$scope', 'Target', 'Survey', '$q', 'Login'];

    function SynchronizerController($routeParams, $location, $scope, Target, Survey, $q, Login) {
        var vm = this;
        $scope.syncRoute;


        activate();

        function activate() {
            $scope.syncModeId = parseInt($routeParams.syncModeId);
            $scope.buttonText = $scope.syncModeId === 1 ? 'COMENZAR SINCRONIZACION' : 'ENVIAR DATOS';

            if (parseInt($routeParams.syncModeId) === 1) {
                //$scope.syncRoute = '#/DoSynchronization';
                $scope.syncRoute = '#/SelectPDV';
            } else {

                $q.all([
                        Survey.getCoachingComplianceSurvey(),
                        Target.getTargetCoaching()
                    ])
                    .then(function(data) {
                        var coachingCompliance = data[0];
                        var userCoachingCompliance = data[1];

                        if (coachingCompliance.length < userCoachingCompliance.target_coaching) {
                            $scope.syncRoute = '#/LockSynchronization/' + (parseInt(userCoachingCompliance.target_coaching) - coachingCompliance.length).toString();
                        } else {
                            $scope.syncRoute = '#/SendSynchronization';
                        }
                    });
            }
        }
    }
})();