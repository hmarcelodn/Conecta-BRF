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
		.when('/Channel/:channelId/AddPdv', {
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
		.when('/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/observaciones/:default?', {
			templateUrl: 'app/views/observations.html',
			controller: 'observationsController',
			access:{
				isFreeAccess: false,
				audit: true
			}
		})
		.when('/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/no_brf/:default?', {
			templateUrl: 'app/views/noBrf.html',
			controller: 'noBrfController',
			access:{
				isFreeAccess: false,
				audit: true
			}
		})
		.when('/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/Module/:moduleId', {
			templateUrl: 'app/views/questions.html',
			controller: 'questionsController',
			access: {
				isFreeAccess: false,
				audit: true
			}
		})
		.when('/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/Module/:moduleId/Category/:categoryId/CategoryType/:categoryType', {
			templateUrl: 'app/views/questions.html',
			controller: 'questionsController',
			access: {
				isFreeAccess: false,
				audit: true
			}
		})		
		.when('/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/:slug/:default?', {
			templateUrl: 'app/views/categorySearch.html',
			controller: 'categoryController',
			access:{
				isFreeAccess: false,
				audit: true
			}
		})			
		.otherwise({
			redirectTo: '/'
		})
}]).
run(function($rootScope, $location, Login, Survey, Database){

	Database.init();

	$rootScope.$on('$viewContentLoaded', function(event){
		$('.collapsible').collapsible();
		$('select').material_select();
	});

	$rootScope.$on('$routeChangeStart', function(currRoute, prevRoute){
		if (prevRoute.access != undefined) {
            if (!prevRoute.access.isFreeAccess && !Login.authenticated()) {
                $location.path('/');
            }
        }

        if(prevRoute.access != undefined){
        	 if(!prevRoute.access.audit && Survey.getAuditMode()){
        	 	$location.path('/Channel/' + Survey.getAuditChannel() + 
        	 				   '/Pdv/' + Survey.getAuditPdv() + 
        	 				   '/Seller/' + Survey.getAuditSeller() + 
        	 				   '/coaching_sp/defaultModule');
        	 }
        }
        else{
        	$location.path('/Main');
        }
	});
});