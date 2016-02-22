(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$scope', '$routeParams', 'Category', '$rootScope', 'Module', '$location'];
    function CategoryController($scope, $routeParams, Category, $rootScope, Module, $location) {
        var vm = this;        
        vm.routeParams = $routeParams;
        vm.currentModule;
        
        activate();

        function activate() { 
            console.log("activate");

            if(vm.routeParams.default === 'defaultModule'){
                console.log("defaultModuleLoaded");
                $rootScope.$emit('defaultModuleLoaded');			
            }            
            
            Module.getModuleBySlug(vm.routeParams.slug).then(function (module){
                vm.currentModule = module;

                Category.getCategories(module.categoryType, vm.routeParams.channelId).then(function(categories){
                    if(categories.length > 0){
                        $scope.categories = categories;
                    }
                    else{
                        $location.path('/Channel/' + vm.routeParams.channelId + 
                                    '/Pdv/' + vm.routeParams.pdvId + 
                                    '/Seller/' + vm.routeParams.sellerId + 
                                    '/Module/' + module.moduleId);
                    }			
                });
            });            
        }
    }
})();