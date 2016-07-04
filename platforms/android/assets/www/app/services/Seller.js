(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .factory('Seller', Seller);

    Seller.$inject = ['$http', 'Database'];
    function Seller($http, Database) {
        var self = this;

        self.synchronizeSellers = function (){
            return $http.get('https://ws.conecta-brf.com/get/sellers/?token=560a100abad225d5afdf4fc6e5334917');
        };

        self.setSeller = function (id, name, channelId){
            return Database.query('INSERT INTO Seller(id, name, channelId) VALUES(?, ?, ?)', [id, name, channelId])
                .then(function (result){
                    return true;
                });
        };

        self.getSellers = function (channelid){
            return Database.query('SELECT id, name, channelId FROM Seller WHERE channelId=?', [channelid])
                .then(function (result){
                    return Database.fetchAll(result);
                });
        };

        self.setChoosenPdv = function (id){
            window.localStorage.setItem(pdvKeyId, id);
        };

        return self;
    }
})();