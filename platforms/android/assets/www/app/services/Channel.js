(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .factory('Channel', Channel);

    Channel.$inject = ['$http', 'Database'];
    function Channel($http, Database) {
        
        var synchronizeChannels = function(){
            return $http.get('https://ws.conecta-brf.com/get/channels/?token=560a100abad225d5afdf4fc6e5334917');
        };

        var setChannel = function(id, name, channelId){
            return Database.query('INSERT INTO Channel(id, name) VALUES(?, ?)', [id, name])
                .then(function (result){
                    return true;
                });
        };

        var getChannels = function(userChannels){
            return Database.query('SELECT id, name From Channel')
                .then(function (result){
                    var channels = Database.fetchAll(result);
                    var allowedChannels = new Array();

                    channels.forEach(function(channel){
                        if(userChannels.indexOf(channel.id.toString()) !== -1){
                            allowedChannels.push(channel);
                        }
                    });                   

                    return allowedChannels;
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