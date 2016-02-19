var BrfNameSpace = BrfNameSpace || {};

brfPhoneGapApp.controller('loginController', ['$scope', '$route', '$location', 'Login', 'Survey', '$routeParams', '$rootScope', 'Module',
	function($scope, $route, $location, Login, Survey, $routeParams, $rootScope, Module){
	
	$scope.username;
	$scope.password;
	$scope.routeParams = $routeParams;

	//Already Authenticated
	if(Login.authenticated()){
		$location.path("/Main");
	}

	$scope.loadModules = function(){
	  	Module.getModules(Survey.getAuditChannel(), Login.getToken().id_role).then(function(modules){
			$scope.modules = modules;
		});
	};

	/*Audit Mode Started*/		
	$rootScope.$on('defaultModuleLoaded', function (event, data) {

		Survey.getPendingSurvey().then(function(pendingSurvey){
			if(pendingSurvey === undefined){
				Survey.setSurvey(new Date().getTime().toString()).then(function(){
					Survey.enableAuditMode($routeParams.channelId, $routeParams.pdvId, $routeParams.sellerId);
					$scope.loadModules();
				});
			}
			else{
				$scope.loadModules();
			}
		});
	});	

	$scope.login = function(event){
		
		Login.validateUser($scope.username, $scope.password).then(function(response){
	
			if(typeof response.data === 'string'){
				if(response.data.trim() === 'false'){
					$scope.username = '';
					$scope.password = '';
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
		if(!Login.authenticated()){
			return "";
		}

		var token = Login.getToken();

		return token.name;
	};

}]);