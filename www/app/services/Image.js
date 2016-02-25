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
            return $http.get('http://ws.brf-horizonte.com/get/images/?token=560a100abad225d5afdf4fc6e5334917');
        }
    }
})();