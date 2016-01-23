var BrfNameSpace = BrfNameSpace || {};

brfPhoneGapApp.controller('loginController', function($scope, $route, $location, loginService){
	
	$scope.username;
	$scope.password;

	//Already Authenticated
	if(loginService.authenticated()){
		$location.path("/Main");
	}

	$scope.login = function(event){
		
		loginService.validateUser($scope.username, $scope.password).then(function(response){
	
			if(typeof response.data === 'string'){
				if(response.data.trim() === 'false'){
					console.log("login failed!");
				}
			}
			else if(typeof response.data === 'object'){
				loginService.authenticate(response.data);
				$location.path("/Main");
			}

		});
	};

	$scope.logout = function(){

		loginService.authenticate(undefined);
		$location.path("/");
	};

	$scope.authenticated = function(){
		return loginService.authenticated();
	};

});