(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .factory('Database', Database);

    Database.$inject = ['$q', 'Config'];
    function Database($q, Config) {

        var self = this;
        self.db = null;

        self.init = function(){

            //self.db = window.sqlitePlugin.openDatabase(Config.DB_CONFIG.name, '1.0', 'database', 2000);
            self.db = window.openDatabase(Config.DB_CONFIG.name, '1.0', 'database', 2000);

            angular.forEach(Config.DB_CONFIG.tables, function(table){
                var  columns = [];

                angular.forEach(table.columns, function(column) {
                    columns.push(column.name + ' ' + column.type);
                });

                var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
                self.query(query);
                console.log('Table ' + table.name + ' initialized');
            });
        };

        self.dropAll = function(){
            var deferred = $q.defer();
            var promises = [];

            angular.forEach(Config.DB_CONFIG.tables, function(table){
                var query = 'DROP TABLE IF EXISTS ' + table.name;
                promises.push(self.query(query));
                console.log('Table ' + table.name + ' has been drop');

                $q.all(promises).then(function(){
                    deferred.resolve();
                });
            });

            return deferred.promise;
        };

        self.query = function(query, bindings) {
            bindings = typeof bindings !== 'undefined' ? bindings : [];
            var deferred = $q.defer();

            self.db.transaction(function(transaction) {
                transaction.executeSql(query, bindings, function(transaction, result) {
                    deferred.resolve(result);
                }, function(transaction, error) {
                    console.log("Database Error:" + error.message);
                    deferred.reject(error);
                });
            });

            return deferred.promise;
        };

        self.fetchAll = function(result) {
            var output = [];

            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }
            
            return output;
        };

        self.fetch = function(result) {
            return result.rows.item(0);
        };

        return self;        

    }
})();
