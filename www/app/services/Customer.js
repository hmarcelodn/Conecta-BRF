(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .factory('Customer', Customer);

    Customer.$inject = ['$http', 'Database'];
    function Customer($http, Database) {
        
        var synchronizeCustomers = function (){
            return $http.get('https://ws.conecta-brf.com/get/customers/?token=560a100abad225d5afdf4fc6e5334917');
        };

        var synchronizeCustomerTypes = function (argument) {
            return $http.get('https://ws.conecta-brf.com/get/customers/type/?token=560a100abad225d5afdf4fc6e5334917');
        };

        var setCustomer = function (id, companyName, cuit, address, pdvType, highlighted, channelid, code) {
            return Database.query('INSERT INTO Customer(customerId, companyName, cuit, address, pdvType, highlighted, channelId, code) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [id, companyName, cuit, address, pdvType, highlighted, channelid, code])
                .then(function (result){
                    return true;
                });
        };

        var setCustomerType = function (id, name) {
            return Database.query('INSERT INTO CustomerType(id, name) VALUES(?, ?)', [id, name])
                .then(function (result){
                    return true;
                });			
        };

        var getCustomers = function (channelid){
            return Database.query('SELECT customerId, address, highlighted, channelId, code FROM Customer WHERE channelId=? LIMIT 0, 2000', [channelid])
                .then(function (result){
                    return Database.fetchAll(result);
                });
        };

        var getCustomerTypes = function (){
            return Database.query('SELECT id, name FROM CustomerType')
                .then(function (result){
                    return Database.fetchAll(result);
                });
        };        
        
        var getPdvTypeByCustomerId = function (customerId) {
            return Database.query('SELECT pdvType FROM Customer')
                .then(function (result) {
                   return Database.fetch(result); 
                });
        };
        
        var getPdvById = function (customerId) {
            return Database.query('SELECT c.customerId, c.companyName, c.cuit, c.address, c.pdvType, c.highlighted, c.channelId, c.code, ct.name as pdvTypeName '+
                                  'FROM Customer c INNER JOIN CustomerType ct ON c.pdvType = ct.id WHERE CustomerId = ? ', [customerId])
                .then(function (result) {
                    return Database.fetch(result);
                });
        };
        
        var service = {
            synchronizeCustomers:synchronizeCustomers,
            synchronizeCustomerTypes: synchronizeCustomerTypes,
            setCustomer: setCustomer,
            setCustomerType: setCustomerType,
            getCustomers: getCustomers,
            getCustomerTypes: getCustomerTypes,
            getPdvTypeByCustomerId: getPdvTypeByCustomerId,
            getPdvById: getPdvById
        };
        
        return service;
    }
})();