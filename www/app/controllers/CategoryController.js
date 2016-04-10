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

            /* Load Default Modules by Event upwards */
            if(vm.routeParams.default !== undefined){
              if(vm.routeParams.default === 'defaultModule'){
                  $rootScope.$emit('defaultModuleLoaded', vm.routeParams);      
              }  
            }          
            
            Module.getModuleBySlug(vm.routeParams.slug).then(function (module){
                vm.currentModule = module;

                switch(module.slug){
                    case 'no_brf':
                      $location.path('/Audit/' + vm.routeParams.auditId + 
                                     '/Channel/' + vm.routeParams.channelId + 
                                     '/Pdv/' + vm.routeParams.pdvId + 
                                     '/Seller/' + vm.routeParams.sellerId +
                                     '/no_brf');                      
                        break;
                    default:
                        Category.getCategories(module.categoryType, vm.routeParams.channelId, module.moduleId).then(function(categories){
                            if(categories.length > 0){
                                $scope.categories = categories;
                            }
                            else{
                                $location.path('/Audit/' + vm.routeParams.auditId + 
                                               '/Channel/' + vm.routeParams.channelId + 
                                               '/Pdv/' + vm.routeParams.pdvId + 
                                               '/Seller/' + vm.routeParams.sellerId + 
                                               '/Module/' + module.moduleId);
                            }           
                        });  
                        break;                  
                }

            });            
        }
    }
})();