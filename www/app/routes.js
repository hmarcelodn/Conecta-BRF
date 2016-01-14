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
		.when('/Form', {
			templateUrl: 'app/views/form.html',
			controller: 'formController'
		})
		.when('/AddPdv', {
			templateUrl: 'app/views/new-pdv.html',
			controller: 'pdvController'
		})
		.when('/Search', {
			templateUrl: 'app/views/search.html',
			controller: 'searchController'			
		})
		.when('/Coaching',{
			templateUrl: 'app/views/coaching.html',
			controller: 'coachingController'
		})
		.when('/Execution', {
			templateUrl: 'app/views/execution.html',
			controller: 'executionController'
		})
		.otherwise({
			redirecTo: '/'
		})
}]).
run(function($rootScope){
	$rootScope.$on('$viewContentLoaded', function(event){
		$('.collapsible').collapsible();
		$('select').material_select();
	});
});