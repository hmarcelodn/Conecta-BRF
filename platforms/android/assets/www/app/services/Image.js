(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .factory('Image', Image);

    Image.$inject = ['$http'];
    function Image($http) {
        var service = {
            getAllImages:getAllImages
        };
        
        return service;

        ////////////////
        function getAllImages() { 
            return $http.get('https://ws.qa.conecta-brf.com/get/images/?token=560a100abad225d5afdf4fc6e5334917');
            //return $http.get('https://ws.conecta-brf.com/get/images/?token=560a100abad225d5afdf4fc6e5334917');
        }
    }
})();