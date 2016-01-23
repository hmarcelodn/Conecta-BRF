brfPhoneGapApp.factory('loginService', ['$http', '$q', function($http, $q){

	return {
		validateUser: function(user, password){
			return $http.get('http://ws.brf-horizonte.com/validate/user/?token=560a100abad225d5afdf4fc6e5334917&email=' + user + '&pass='+ password);
		},
		authenticated: function(){
			return (BrfNameSpace.Session.getInstance().get() != undefined);
		},
		authenticate: function(data){
			BrfNameSpace.Session.getInstance().set(data);
			return;
		},
		getToken: function(){
			return BrfNameSpace.Session.getInstance().get()
		}
	}

}]);