(function() {
    'use strict';

    angular
        .module('brfPhoneGapApp')
        .factory('Customer', Customer);

    Customer.$inject = ['$http', 'Database', '$rootScope', 'Login'];

    function Customer($http, Database, $rootScope, Login) {
        //LUUU crear 3 synchronizeCustomers 

        var synchronizeCustomers = function() {
            return $http.get('https://ws.conecta-brf.com/get/customers/?token=560a100abad225d5afdf4fc6e5334917');
        };

        var synchronizeCustomersAll = function() {
            return $http.get('https://ws.conecta-brf.com/v2/get/customers/?token=560a100abad225d5afdf4fc6e5334917&customer_type=3&selected_ids=&id_user=' + Login.getToken().id);
        };

        var synchronizeCustomersChains = function() {
            //console.log ('def chains');
            //console.log('https://ws.conecta-brf.com/v2/get/customers/?token=560a100abad225d5afdf4fc6e5334917&customer_type=1&selected_ids=' + $rootScope.SelectedChains + '&id_user=' + Login.getToken().id);
            return $http.get('https://ws.conecta-brf.com/v2/get/customers/?token=560a100abad225d5afdf4fc6e5334917&customer_type=1&selected_ids=' + $rootScope.SelectedChains + '&id_user=' + Login.getToken().id);
        };

        var synchronizeCustomersDis = function() {
            console.log('def chains');
            console.log('https://ws.conecta-brf.com/v2/get/customers/?token=560a100abad225d5afdf4fc6e5334917&customer_type=2&selected_ids=' + $rootScope.SelectedDis + '&id_user=' + Login.getToken().id);
            return $http.get('https://ws.conecta-brf.com/v2/get/customers/?token=560a100abad225d5afdf4fc6e5334917&customer_type=2&selected_ids=' + $rootScope.SelectedDis + '&id_user=' + Login.getToken().id);
        };


        var synchronizeCustomerTypes = function(argument) {
            return $http.get('https://ws.conecta-brf.com/get/customers/type/?token=560a100abad225d5afdf4fc6e5334917');
        };

        var setCustomer = function(id, companyName, cuit, address, pdvType, highlighted, channelid, code, id_type) {
            return Database.query('INSERT INTO Customer(customerId, companyName, cuit, address, pdvType, highlighted, channelId, code, id_type) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, companyName, cuit, address, pdvType, highlighted, channelid, code, id_type])
                .then(function(result) {
                    return true;
                });
        };

        var setCustomerType = function(id, name) {
            return Database.query('INSERT INTO CustomerType(id, name) VALUES(?, ?)', [id, name])
                .then(function(result) {
                    return true;
                });
        };

        var getCustomers = function(channelid) {
            return Database.query('SELECT customerId, address, highlighted, channelId, code, id_type FROM Customer WHERE channelId=? LIMIT 0, 2000', [channelid])
                .then(function(result) {
                    return Database.fetchAll(result);
                });
        };

        var getCustomerTypes = function() {
            return Database.query('SELECT id, name FROM CustomerType')
                .then(function(result) {
                    return Database.fetchAll(result);
                });
        };

        var getPdvTypeByCustomerId = function(customerId) {
            return Database.query('SELECT pdvType FROM Customer')
                .then(function(result) {
                    return Database.fetch(result);
                });
        };

        var getPdvById = function(customerId) {
            return Database.query('SELECT c.customerId, c.companyName, c.cuit, c.address, c.pdvType, c.highlighted, c.channelId, c.code, ct.name as pdvTypeName ' +
                    'FROM Customer c INNER JOIN CustomerType ct ON c.pdvType = ct.id WHERE CustomerId = ? ', [customerId])
                .then(function(result) {
                    return Database.fetch(result);
                });
        };

        var service = {
            synchronizeCustomers: synchronizeCustomers,
            synchronizeCustomersAll: synchronizeCustomersAll,
            synchronizeCustomersChains: synchronizeCustomersChains,
            synchronizeCustomersDis: synchronizeCustomersDis,
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