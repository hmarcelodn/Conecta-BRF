(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .service('Target', Target);

    Target.$inject = ['Database'];
    function Target(Database) {
           var self = this;
           
           self.getTargetCoaching = function () {
               return Database.query('SELECT target_coaching FROM Target')
                .then(function (result) {
                    return Database.fetch(result);
                });
           };
           
           return self;
    }
})();