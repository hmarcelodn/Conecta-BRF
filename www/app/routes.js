brfPhoneGapApp.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/Main', {
			templateUrl: 'app/views/main.html',
			controller: 'mainController',
			access:{
				isFreeAccess: false,
				audit: false
			}
		})
		.when('/Dashboard', {
			templateUrl: 'app/views/dashboard.html',
			controller: 'dashboardController',
			access:{
				isFreeAccess: false,
				audit: false
			}
		})
		.when('/Welcome', {
			templateUrl: 'app/views/welcome.html',
			controller: 'welcomeController',
			access:{
				isFreeAccess: false,
				audit: false
			}			
		})
		.when('/Channel', {
			templateUrl: 'app/views/channels.html',
			controller: 'channelsController',
			access:{
				isFreeAccess: false,
				audit: false
			}
		})
		.when('/Channel/:channelId/Pdv', {
			templateUrl: 'app/views/form.html',
			controller: 'formController',
			access:{
				isFreeAccess: false,
				audit: false
			}
		})
		.when('/AddPdv', {
			templateUrl: 'app/views/new-pdv.html',
			controller: 'pdvController',
			access:{
				isFreeAccess: false,
				audit: false
			}
		})
		.when('/Channel/:channelId/Pdv/:pdvId/Seller', {
			templateUrl: 'app/views/search.html',
			controller: 'searchController',
			access:{
				isFreeAccess: false,
				audit: false
			}	
		})
		.when('/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/Coaching',{
			templateUrl: 'app/views/coaching.html',
			controller: 'coachingController',
			access:{
				isFreeAccess: false,
				audit: true
			}
		})
		.when('/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/Execution/:categoryId?', {
			templateUrl: 'app/views/execution.html',
			controller: 'executionController',
			access:{
				isFreeAccess: false,
				audit: true
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
				isFreeAccess: false,
				audit: false
			}
		})
		.when('/DoSynchronization', {
			templateUrl: 'app/views/doSynchronization.html',
			controller: 'doSynchronizationController',
			access:{
				isFreeAccess: false,
				audit: false
			}
		})
		.when('/SyncOk', {
			templateUrl: 'app/views/syncOk.html',
			controller: 'syncOkController',
			access:{
				isFreeAccess: false,
				audit: false
			}
		})
		.when('/SyncNok', {
			templateUrl: 'app/views/syncNok.html',
			controller: 'syncNokController',
			access:{
				isFreeAccess: false,
				audit: false
			}
		})		
		.when('/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/Observations', {
			templateUrl: 'app/views/observations.html',
			controller: 'observationsController',
			access:{
				isFreeAccess: false,
				audit: true
			}
		})
		.when('/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/NoBrf', {
			templateUrl: 'app/views/nobrf.html',
			controller: 'noBrfController',
			access:{
				isFreeAccess: false,
				audit: true
			}
		})
		.when('/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/CategorySearch/:modeId', {
			templateUrl: 'app/views/categorySearch.html',
			controller: 'categoryController',
			access:{
				isFreeAccess: false,
				audit: true
			}
		})
		.when('/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/Prices/:categoryId', {
			templateUrl: 'app/views/prices.html',
			controller: 'pricesController',
			access: {
				isFreeAccess: false,
				audit: true
			}
		})
		.otherwise({
			redirecTo: '/'
		})
}]).
run(function($rootScope, $location, loginService, surveyService){
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

        if(prevRoute.access != undefined){
        	 if(!prevRoute.access.audit && surveyService.getAuditMode()){
        	 	$location.path('/Channel/' + surveyService.getAuditChannel() + 
        	 				   '/Pdv/' + surveyService.getAuditPdv() + 
        	 				   '/Seller/' + surveyService.getAuditSeller() + 
        	 				   '/Coaching');
        	 }
        }
        else{
        	$location.path('/Main');
        }
	});
});