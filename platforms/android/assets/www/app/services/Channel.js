(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .factory('Channel', Channel);

    Channel.$inject = ['$http', 'Database'];
    function Channel($http, Database) {
        
        var synchronizeChannels = function(){
            return $http.get('http://ws.brf-horizonte.com/get/channels/?token=560a100abad225d5afdf4fc6e5334917');
        };

        var setChannel = function(id, name){
            return Database.query('INSERT INTO Channel(id, name) VALUES(?, ?)', [id, name])
                .then(function (result){
                    return true;
                });
        };

        var getChannels = function(){
            return Database.query('Select id, name From Channel')
                .then(function (result){
                    return Database.fetchAll(result);
                });
        };        
        
        var service = {
            synchronizeChannels: synchronizeChannels,
            setChannel: setChannel,
            getChannels: getChannels            
        };
        
        return service;
    }
})();