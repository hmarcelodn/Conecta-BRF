(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .factory('Customer', Customer);

    Customer.$inject = ['$http', 'Database'];
    function Customer($http, Database) {
        
        var synchronizeCustomers = function (){
            return $http.get('http://ws.brf-horizonte.com/get/customers/?token=560a100abad225d5afdf4fc6e5334917');
        };

        var synchronizeCustomerTypes = function (argument) {
            return $http.get('http://ws.brf-horizonte.com/get/customers/type/?token=560a100abad225d5afdf4fc6e5334917');
        };

        var setCustomer = function (id, companyName, cuit, address, pdvType) {
            return Database.query('INSERT INTO Customer(customerId, companyName, cuit, address, pdvType) VALUES(?, ?, ?, ?, ?)', [id, companyName, cuit, address, pdvType])
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

        var getCustomers = function (){
            return Database.query('SELECT customerId, address FROM Customer LIMIT 0, 10')
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
        
        var service = {
            synchronizeCustomers:synchronizeCustomers,
            synchronizeCustomerTypes: synchronizeCustomerTypes,
            setCustomer: setCustomer,
            setCustomerType: setCustomerType,
            getCustomers: getCustomers,
            getCustomerTypes: getCustomerTypes
            
        };
        
        return service;
    }
})();