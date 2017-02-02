(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .factory('Dashboard', Dashboard);

    Dashboard.$inject = ['$http', 'Database'];
    function Dashboard($http, Database) {
        var service = {
            synchronizeDating:synchronizeDating,
            synchronizeTargets: synchronizeTargets,
            setDating: setDating,
            setTarget: setTarget,
            getDatings: getDatings,
            getDailyBase: getDailyBase
        };
        
        return service;

        ////////////////
        function synchronizeDating() { 
            return $http.get('https://ws.qa.conecta-brf.com/get/dashboard/dating/?token=560a100abad225d5afdf4fc6e5334917');
            //return $http.get('https://ws.conecta-brf.com/get/dashboard/dating/?token=560a100abad225d5afdf4fc6e5334917');
        }
        
        function synchronizeTargets(userId) {
            return $http.get('https://ws.qa.conecta-brf.com/get/user/target/?token=560a100abad225d5afdf4fc6e5334917&id_user=' + userId);
            //return $http.get('https://ws.conecta-brf.com/get/user/target/?token=560a100abad225d5afdf4fc6e5334917&id_user=' + userId);
        }
        
        function setDating(id, type, label) {
            return Database.query('INSERT INTO Dating(id, type, label) VALUES(?,?, ?)', [id, type, label])
                .then(function () {
                    return true;
                });
        }
        
        function setTarget(target_coaching, id_user) {
            return Database.query('INSERT INTO Target(target_coaching, id_user) VALUES (?, ?)', [target_coaching, id_user])
                .then(function () {
                    return true;
                });
        }
        
        function getDatings(params) {
            return Database.query('SELECT * FROM Dating')
                .then(function (result) {
                    return Database.fetchAll(result);
                });
        }
        
        function getDailyBase(userId) {
            return Database.query('SELECT * FROM Target WHERE id_user = ?', [userId])
                .then(function (result) {
                    return Database.fetch(result);
                });
        }
    }
})();