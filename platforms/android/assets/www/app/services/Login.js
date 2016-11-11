(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .factory('Login', Login);

    Login.$inject = ['$http', 'Database'];
    function Login($http, Database) {
        var self = this;

        self.validateUser = function (user, password){
            return $http.get('https://ws.qa.conecta-brf.com/v2/validate/user/?token=560a100abad225d5afdf4fc6e5334917&email=' + user + '&pass='+ password);
            //return $http.get('https://ws.conecta-brf.com/v2/validate/user/?token=560a100abad225d5afdf4fc6e5334917&email=' + user + '&pass='+ password);
        };

        self.authenticated = function (){
            return (BrfNameSpace.Session.getInstance().get() != undefined);
        };

        self.authenticate = function (data) {
            BrfNameSpace.Session.getInstance().set(data);
            return;
        };

        self.getToken = function (argument) {
            return BrfNameSpace.Session.getInstance().get();
        };

        return self;
    }
})();