brfPhoneGapApp.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'app/views/main.html',
			controller: 'mainController'
		})
		.when('/Dashboard', {
			templateUrl: 'app/views/dashboard.html',
			controller: 'dashboardController'
		})
		.when('/Welcome', {
			templateUrl: 'app/views/welcome.html',
			controller: 'welcomeController'			
		})
		.when('/Channels', {
			templateUrl: 'app/views/channels.html',
			controller: 'channelsController'
		})
		.when('/Search', {
			templateUrl: 'app/views/search.html',
			controller: 'searchController'
		})
		.otherwise({
			redirecTo: '/'
		})
}]);