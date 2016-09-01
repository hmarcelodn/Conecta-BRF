(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .factory('Seller', Seller);

    Seller.$inject = ['$http', 'Database'];
    function Seller($http, Database, Customer) {
        var self = this;

        self.synchronizeSellers = function (){
            return $http.get('https://ws.conecta-brf.com/get/sellers/?token=560a100abad225d5afdf4fc6e5334917');
        };

        self.setSeller = function (id, name, channelId, id_di, keyword){
            return Database.query('INSERT INTO Seller(id, name, channelId, id_di, keyword) VALUES(?, ?, ?, ?, ?)', [id, name, channelId, id_di, keyword])
                .then(function (result){
                    return true;
                });
        };

        self.getSellers = function (channelid, pdvId){
            //console.log ('customer.id');
            //console.log (pdvId);
            //console.log (channelid);
            var query = 'SELECT id, name, channelId, id_di FROM Seller ' +
            ' WHERE channelId= ' + channelid +
            //' AND ((id_di = 0 AND (Select 1 FROM customer Where customerid ='+ pdvId +  ' AND id_type = 1)) OR (id_di =' + pdvId + ')) ';
            ' AND ((id_di = 0 AND (Select 1 FROM customer Where customerid ='+ pdvId +  ' AND id_type = 1)) OR (keyword = (Select companyName From  Customer Where customerid= ' + pdvId + ') )) ';
            console.log (query);
            //return Database.query(query, [channelid])
            return Database.query(query)
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