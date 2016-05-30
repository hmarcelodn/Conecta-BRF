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

        self.setSeller = function (id, name){
            return Database.query('INSERT INTO Seller(id, name) VALUES(?, ?)', [id, name])
                .then(function (result){
                    return true;
                });
        };

        self.getSellers = function (){
            return Database.query('SELECT id, name FROM Seller')
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