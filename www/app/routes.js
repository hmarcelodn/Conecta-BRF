brfPhoneGapApp.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/Main', {
			templateUrl: 'app/views/main.html',
			controller: 'mainController',
			access:{
				isFreeAccess: false
			}
		})
		.when('/Dashboard', {
			templateUrl: 'app/views/dashboard.html',
			controller: 'dashboardController',
			access:{
				isFreeAccess: false
			}
		})
		.when('/Welcome', {
			templateUrl: 'app/views/welcome.html',
			controller: 'welcomeController',
			access:{
				isFreeAccess: false
			}			
		})
		.when('/Channels', {
			templateUrl: 'app/views/channels.html',
			controller: 'channelsController',
			access:{
				isFreeAccess: false
			}
		})
		.when('/Form', {
			templateUrl: 'app/views/form.html',
			controller: 'formController',
			access:{
				isFreeAccess: false
			}
		})
		.when('/AddPdv', {
			templateUrl: 'app/views/new-pdv.html',
			controller: 'pdvController',
			access:{
				isFreeAccess: false
			}
		})
		.when('/Search', {
			templateUrl: 'app/views/search.html',
			controller: 'searchController',
			access:{
				isFreeAccess: false
			}	
		})
		.when('/Coaching',{
			templateUrl: 'app/views/coaching.html',
			controller: 'coachingController',
			access:{
				isFreeAccess: false
			}
		})
		.when('/Execution', {
			templateUrl: 'app/views/execution.html',
			controller: 'executionController',
			access:{
				isFreeAccess: false
			}
		})
		.when('/',{
			templateUrl: 'app/views/login.html',
			controller: 'loginController',
			access:{
				isFreeAccess: true
			}
		})
		.when('/Synchronizer', {
			templateUrl: 'app/views/synchronizer.html',
			controller: 'synchronizerController',
			access:{
				isFreeAccess: false
			}
		})
		.when('/DoSynchronization', {
			templateUrl: 'app/views/doSynchronization.html',
			controller: 'doSynchronizationController',
			access:{
				isFreeAccess: false
			}
		})
		.when('/SyncOk', {
			templateUrl: 'app/views/syncOk.html',
			controller: 'syncOkController',
			access:{
				isFreeAccess: false
			}
		})
		.when('/SyncNok', {
			templateUrl: 'app/views/syncNok.html',
			controller: 'syncNokController',
			access:{
				isFreeAccess: false
			}
		})		
		.otherwise({
			redirecTo: '/'
		})
}]).
run(function($rootScope, $location, loginService){
	$rootScope.$on('$viewContentLoaded', function(event){
		$('.collapsible').collapsible();
		$('select').material_select();
	});

	$rootScope.$on('$routeChangeStart', function(currRoute, prevRoute){
		if (prevRoute.access != undefined) {
            if (!prevRoute.access.isFreeAccess && !loginService.authenticated()) {
                $location.path('/');
            }
        }
	});
});