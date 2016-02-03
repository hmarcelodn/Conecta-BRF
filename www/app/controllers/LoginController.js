var BrfNameSpace = BrfNameSpace || {};

brfPhoneGapApp.controller('loginController', ['$scope', '$route', '$location', 'Login', 'Survey', '$routeParams', 
	function($scope, $route, $location, Login, Survey, $routeParams){
	
	$scope.username;
	$scope.password;
	$scope.routeParams = $routeParams;

	//Already Authenticated
	if(Login.authenticated()){
		$location.path("/Main");
	}

	$scope.login = function(event){
		
		Login.validateUser($scope.username, $scope.password).then(function(response){
	
			if(typeof response.data === 'string'){
				if(response.data.trim() === 'false'){
					console.log("login failed!");
				}
			}
			else if(typeof response.data === 'object'){
				Login.authenticate(response.data);
				$location.path("/Main");
			}

		});
	};

	$scope.logout = function(){
		Login.authenticate(undefined);
		$location.path("/");
	};

	$scope.authenticated = function(){
		return Login.authenticated();
	};

	$scope.isAuditModeEnabled = function(){
		return Survey.getAuditMode();
	};

	$scope.getUserName = function(){
		var token = Login.getToken();

		return token.name;
	};

}]);