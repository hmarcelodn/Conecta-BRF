brfPhoneGapApp.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/Main', {
			templateUrl: 'app/views/main.html',
			controller: 'MainController',
            controllerAs: 'vm',
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
		.when('/Audit/:auditId', {
			templateUrl: 'app/views/welcome.html',
			controller: 'WelcomeController',
            controllerAs: 'vm',
			access:{
				isFreeAccess: false,
				audit: false
			}			
		})
		.when('/Audit/:auditId/Channel', {
			templateUrl: 'app/views/channels.html',
			controller: 'ChannelsController',
            controllerAs: 'vm',
			access:{
				isFreeAccess: false,
				audit: false
			}
		})
		.when('/Audit/:auditId/Channel/:channelId/Pdv', {
			templateUrl: 'app/views/form.html',
			controller: 'FormController',
            controllerAs: 'vm',
			access:{
				isFreeAccess: false,
				audit: false
			}
		})
		.when('/Audit/:auditId/Channel/:channelId/AddPdv', {
			templateUrl: 'app/views/new-pdv.html',
			controller: 'PdvController',
			access:{
				isFreeAccess: false,
				audit: false
			}
		})
		.when('/Audit/:auditId/Channel/:channelId/Pdv/:pdvId/Seller', {
			templateUrl: 'app/views/search.html',
			controller: 'SearchController',
            controllerAs: 'vm',
			access:{
				isFreeAccess: false,
				audit: false
			}	
		})
		.when('/',{
			templateUrl: 'app/views/login.html',
			controller: 'LoginController',
            controllerAs: 'vm',
			access:{
				isFreeAccess: true				
			}
		})
		.when('/Synchronizer/:syncModeId', {
			templateUrl: 'app/views/synchronizer.html',
			controller: 'SynchronizerController',
			access:{
				isFreeAccess: false,
				audit: false
			}
		})
		.when('/DoSynchronization', {
			templateUrl: 'app/views/doSynchronization.html',
			controller: 'DoSynchronizationController',
            controllerAs: 'vm',
			access:{
				isFreeAccess: false,
				audit: false
			}
		})
        .when('/SendSynchronization',{
			templateUrl: 'app/views/sendSynchronization.html',
			controller: 'SendSynchronizationController',
            controllerAs: 'vm',
			access:{
				isFreeAccess: false,
				audit: false
			}            
        })
		.when('/SyncOk', {
			templateUrl: 'app/views/syncOk.html',
			controller: 'SyncOkController',
            controllerAs: 'vm',
			access:{
				isFreeAccess: false,
				audit: false
			}
		})
		.when('/SyncNok', {
			templateUrl: 'app/views/syncNok.html',
			controller: 'SyncNokController',
            controllerAs: 'vm',
			access:{
				isFreeAccess: false,
				audit: false
			}
		})		
		.when('/Audit/:auditId/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/observaciones/:default?', {
			templateUrl: 'app/views/observations.html',
			controller: 'ObservationsController',
			access:{
				isFreeAccess: false,
				audit: true
			}
		})
		.when('/Audit/:auditId/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/no_brf/:default?', {
			templateUrl: 'app/views/noBrf.html',
			controller: 'NoBrfController',
            controllerAs: 'vm',
			access:{
				isFreeAccess: false,
				audit: true
			}
		})
		.when('/Audit/:auditId/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/Module/:moduleId', {
			templateUrl: 'app/views/questions.html',
			controller: 'QuestionsController',
            controllerAs: 'vm',
			access: {
				isFreeAccess: false,
				audit: true
			}
		})
		.when('/Audit/:auditId/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/Module/:moduleId/Category/:categoryId/CategoryType/:categoryType', {
			templateUrl: 'app/views/questions.html',
			controller: 'QuestionsController',
            controllerAs: 'vm',
			access: {
				isFreeAccess: false,
				audit: true
			}
		})		
		.when('/Audit/:auditId/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/:slug/:default?', {
			templateUrl: 'app/views/categorySearch.html',
			controller: 'CategoryController',
            controllerAs: 'vm',
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
        	 	$location.path('/Audit/' + Survey.getAuditId() +
                               '/Channel/' + Survey.getAuditChannel() + 
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