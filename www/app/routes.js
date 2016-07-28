brfPhoneGapApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/Main', {
            templateUrl: 'app/views/main.html',
            controller: 'MainController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: false,
                audit: false
            }
        })
        .when('/Dashboard/:auditId', {
            templateUrl: 'app/views/dashboard.html',
            controller: 'DashboardController',
            access: {
                isFreeAccess: false,
                audit: false
            }
        })
        .when('/Audit/:auditId', {
            templateUrl: 'app/views/welcome.html',
            controller: 'WelcomeController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: false,
                audit: false
            }
        })
        .when('/Audit/:auditId/Channel', {
            templateUrl: 'app/views/channels.html',
            controller: 'ChannelsController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: false,
                audit: false
            }
        })
        .when('/Audit/:auditId/Channel/:channelId/Pdv', {
            templateUrl: 'app/views/form.html',
            controller: 'FormController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: false,
                audit: false
            }
        })
        .when('/Audit/:auditId/Channel/:channelId/AddPdv', {
            templateUrl: 'app/views/new-pdv.html',
            controller: 'PdvController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: false,
                audit: false
            }
        })
        .when('/Audit/:auditId/Channel/:channelId/Pdv/:pdvId/Seller', {
            templateUrl: 'app/views/search.html',
            controller: 'SearchController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: false,
                audit: false
            }
        })
        .when('/', {
            templateUrl: 'app/views/login.html',
            controller: 'AuthController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: true
            }
        })
        .when('/Synchronizer/:syncModeId', {
            templateUrl: 'app/views/synchronizer.html',
            controller: 'SynchronizerController',
            access: {
                isFreeAccess: false,
                audit: false
            }
        })
        .when('/DoSynchronization', {
            templateUrl: 'app/views/doSynchronization.html',
            controller: 'DoSynchronizationController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: false,
                audit: false
            }
        })
        .when('/SendSynchronization', {
            templateUrl: 'app/views/sendSynchronization.html',
            controller: 'SendSynchronizationController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: false,
                audit: false
            }
        })
        .when('/SyncOk/:syncId', {
            templateUrl: 'app/views/syncOk.html',
            controller: 'SyncOkController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: false,
                audit: false
            }
        })
        .when('/SyncNok', {
            templateUrl: 'app/views/syncNok.html',
            controller: 'SyncNokController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: false,
                audit: false
            }
        })
        .when('/Audit/:auditId/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/observaciones', {
            templateUrl: 'app/views/observations.html',
            controller: 'ObservationsController',
            access: {
                isFreeAccess: false,
                audit: true
            }
        })
        .when('/Audit/:auditId/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/observaciones_rtm', {
            templateUrl: 'app/views/observations.html',
            controller: 'ObservationsController',
            access: {
                isFreeAccess: false,
                audit: true
            }
        })
        .when('/Audit/:auditId/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/no_brf', {
            templateUrl: 'app/views/noBrf.html',
            controller: 'NoBrfController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: false,
                audit: true
            }
        })
        .when('/Audit/:auditId/Channel/:channelId/Pdv/:pdvId/Seller/:sellerId/Mandatory', {
            templateUrl: 'app/views/mandatoryQuestions.html',
            controller: 'MandatoryQuestionsController',
            controllerAs: 'vm',
            access: {
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
            access: {
                isFreeAccess: false,
                audit: true
            }
        })
        .when('/Help/:questionId', {
            templateUrl: 'app/views/help.html',
            controller: 'HelpController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: false,
                audit: true
            }
        })
        .when('/WebSQL', {
            templateUrl: 'app/views/webSQL.html',
            controller: 'WebSQLController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: true,
                audit: true
            }
        })
        .when('/beforeLogOff', {
            templateUrl: 'app/views/beforeLogOff.html',
            controller: 'BeforeLogOffController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: false,
                audit: false
            }
        })
        .when('/beforeCancelSurvey', {
            templateUrl: 'app/views/beforeCancelSurvey.html',
            controller: 'BeforeCancelSurveyController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: true,
                audit: true
            }
        })
        .when('/LockSynchronization/:leftCoaching', {
            templateUrl: 'app/views/lockSynchronization.html',
            controller: 'LockSynchronizationController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: false,
                audit: false
            }
        })
        .when('/SelectPDV', {
            templateUrl: 'app/views/SelectPDV.html',
            controller: 'SelectPDVController',
            controllerAs: 'vm',
            access: {
                isFreeAccess: false,
                audit: false
            }
        })

    .otherwise({
        redirectTo: '/'
    })
}]).
run(function($rootScope, $location, Login, Survey, Database, Module) {

    Database.init();

    $rootScope.$on('$viewContentLoaded', function(event) {
        $('.collapsible').collapsible();
        $('select').material_select();
    });

    $rootScope.$on('$routeChangeStart', function(currRoute, prevRoute) {

        if (prevRoute.access != undefined) {
            if (!prevRoute.access.isFreeAccess && !Login.authenticated()) {
                $location.path('/');
            }
        }

        if (prevRoute.access != undefined) {
            if (!prevRoute.access.audit && Survey.getAuditMode()) {

                /* Load default Module */
                Module.getModules(Survey.getAuditChannel(), Login.getToken().id_role, Survey.getAuditId()).then(function(modules) {
                    $location.path('/Audit/' + Survey.getAuditId() +
                        '/Channel/' + Survey.getAuditChannel() +
                        '/Pdv/' + Survey.getAuditPdv() +
                        '/Seller/' + Survey.getAuditSeller() +
                        '/' + modules[0].slug +
                        '/defaultModule');
                });

            }
        } else {
            $location.path('/Main');
        }
    });
});