(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('SurveyController', SurveyController);

    SurveyController.$inject = ['$scope', '$route', '$location', 'Survey'];
    function SurveyController($scope, $route, $location, Survey) {
        var vm = this;        
        
        var closeAudit = function(){
     		Survey.disableAuditMode();
		
            Survey.closeSurvey().then(function(){						
                $location.path('/Welcome');
            });       
        }

        activate();

        function activate() { }
        
        vm.closeAudit = closeAudit;
    }
})();