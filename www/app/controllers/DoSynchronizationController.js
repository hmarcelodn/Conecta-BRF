(function() {
    'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('DoSynchronizationController', DoSynchronizationController);

    DoSynchronizationController.$inject = ['$scope', '$route', '$q', '$location', 'Category', 'Channel', 'Customer', 'Module', 'Question', 'Seller', 'Database', 'Image', '$rootScope', 'Dashboard', 'Login'];

    function DoSynchronizationController($scope, $route, $q, $location, Category, Channel, Customer, Module, Question, Seller, Database, Image, $rootScope, Dashboard, Login) {
        var vm = this;
        vm.devicePath = undefined;

        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
            vm.devicePath = cordova.file.externalApplicationStorageDirectory;
        }

        //LUU 
        //console.log($rootScope.SelectedChains);
        //console.log("pepe" + $rootScope.SelectedDis);

        activate();

        function activate() {

            // 0 - Waiting
            // 1 - Running
            // 2 - Success
            $scope.syncChannels = 0;
            $scope.syncCustomers = 0;
            $scope.syncCustomersType = 0;
            $scope.syncSellers = 0;
            $scope.syncMainModules = 0;
            $scope.syncModules = 0;
            $scope.syncCategories = 0;
            $scope.syncCategoriesImg = 0;
            $scope.syncQuestions = 0;
            $scope.syncQuestionsGroups = 0;
            $scope.syncImages = 0;
            $scope.syncDating = 0;
            $scope.syncTarget = 0;

            Database.dropAll().then(function() {

                    Database.init();

                    var deferred = $q.defer();
                    $scope.syncChannels = 1;

                    Channel.synchronizeChannels().then(function(channels) {

                            var promises = [];

                            angular.forEach(channels.data.channels, function(value, key) {
                                promises.push(Channel.setChannel(value.id, value.name));
                            });

                            $q.all(promises).then(function() {
                                $scope.syncChannels = 2;
                                deferred.resolve();
                            });
                        })
                        .catch(function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                })
                .then(function() {

                    var deferred = $q.defer();
                    $scope.syncCustomers = 1;
                    console.log ('A');
                    console.log ($rootScope.SelectedChains);
                    console.log ($rootScope.SelectedDis);
                    console.log ('B');
                    if ($rootScope.SelectedChains == 0 && $rootScope.SelectedDic == 0) {
                        Customer.synchronizeCustomersAll().then(function(customers) {
                                console.log("IN ALL");
                                var promises = [];

                                angular.forEach(customers.data.customers, function(value, key) {
                                    promises.push(Customer.setCustomer(value.id, value["company_name"], value.cuit, value.address, value.type_pdv, value.highlighted, value.id_channel, value.code));
                                });

                                $q.all(promises).then(function() {
                                    $scope.syncCustomers = 2;
                                    deferred.resolve();
                                });
                            })
                            .catch(function(error) {
                                deferred.reject(error);
                            });

                        //return deferred.promise;
                    }
                    if ($rootScope.SelectedChains != 0) {
                        Customer.synchronizeCustomersChains().then(function(customers) {
                                console.log("IN Chains");
                                var promises = [];

                                angular.forEach(customers.data.customers, function(value, key) {
                                    promises.push(Customer.setCustomer(value.id, value["company_name"], value.cuit, value.address, value.type_pdv, value.highlighted, value.id_channel, value.code));
                                });

                                $q.all(promises).then(function() {
                                    $scope.syncCustomers = 2;
                                    deferred.resolve();
                                });
                            })
                            .catch(function(error) {
                                deferred.reject(error);
                            });

                        //return deferred.promise;
                    }
                    if ($rootScope.SelectedDis != 0) {
                        Customer.synchronizeCustomersDis().then(function(customers) {
                                console.log("IN DIS");
                                var promises = [];

                                angular.forEach(customers.data.customers, function(value, key) {
                                    promises.push(Customer.setCustomer(value.id, value["company_name"], value.cuit, value.address, value.type_pdv, value.highlighted, value.id_channel, value.code));
                                });

                                $q.all(promises).then(function() {
                                    $scope.syncCustomers = 2;
                                    deferred.resolve();
                                });
                            })
                            .catch(function(error) {
                                deferred.reject(error);
                            });

                        //return deferred.promise;
                    }
                    return deferred.promise;
                })
                .then(function() {

                    var deferred = $q.defer();
                    $scope.syncCustomersType = 1;

                    Customer.synchronizeCustomerTypes().then(function(customerTypes) {
                            var promises = [];

                            angular.forEach(customerTypes.data.customer_types, function(value, key) {
                                promises.push(Customer.setCustomerType(value.id, value.name));
                            });

                            $q.all(promises).then(function() {
                                $scope.syncCustomersType = 2;
                                deferred.resolve();
                            });
                        })
                        .catch(function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                })
                .then(function() {

                    var deferred = $q.defer();
                    $scope.syncSellers = 1;

                    Seller.synchronizeSellers().then(function(sellers) {
                            var promises = [];

                            angular.forEach(sellers.data.sellers, function(value, key) {
                                promises.push(Seller.setSeller(value.id, value.name, value.id_channel));
                            });

                            $q.all(promises).then(function() {
                                $scope.syncSellers = 2;
                                deferred.resolve();
                            });
                        })
                        .catch(function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                })
                .then(function() {

                    var deferred = $q.defer();
                    $scope.syncMainModules = 1;

                    Module.synchronizeMainModules().then(function(mainModules) {
                            var promises = [];

                            angular.forEach(mainModules.data.main_modules, function(value, key) {
                                promises.push(
                                    Module.setMainModule(value.id, value.mod_name, value.icon, value.map_label, value.has_dashboard)
                                );
                            });

                            $q.all(promises).then(function() {
                                $scope.syncMainModules = 2;
                                deferred.resolve();
                            });
                        })
                        .catch(function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                })
                .then(function() {

                    var deferred = $q.defer();
                    $scope.syncModules = 1;

                    Module.synchronizeModules().then(function(modules) {

                            var promises = [];

                            angular.forEach(modules.data.modules, function(value, key) {

                                var moduleId = value.id;

                                promises.push(Module.setModule(value.id, value.behavior, value.mod_name, value.category_type, value.style.color, value.style.icon, value.slug, value.id_main_mod, value.bind));

                                angular.forEach(value.ids_channels, function(value, key) {
                                    promises.push(Module.setModuleChannels(moduleId, value));
                                });

                                angular.forEach(value.ids_user_roles, function(value, key) {
                                    promises.push(Module.setModuleRoles(moduleId, value));
                                });
                                
                                console.log (moduleId);
                                console.log (value.bind);
                                angular.forEach(value.bind, function(value, key) {
                                    if (value.bind != '0'){        
                                        promises.push(Module.setModuleBind(moduleId, moduleId));
                                    } else {
                                        promises.push(Module.setModuleBind(moduleId, value));
                                    }
                                });
                                

                            });

                            $q.all(promises).then(function() {
                                $scope.syncModules = 2;
                                deferred.resolve();
                            });
                        })
                        .catch(function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                })
                .then(function(categories) {

                    var deferred = $q.defer();
                    $scope.syncCategories = 1;

                    Category.synchronizeCategories().then(function(categories) {
                            var promises = [];

                            angular.forEach(categories.data.categories, function(value, key) {
                                var categoryId = value.id;

                                promises.push(Category.setCategory(value.id, value.type, value.name));

                                angular.forEach(value.id_channels, function(value, key) {
                                    promises.push(Category.setCategoryChannel(categoryId, value));
                                });
                            });

                            $q.all(promises).then(function() {
                                $scope.syncCategories = 2;
                                deferred.resolve();
                            });
                        })
                        .catch(function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                })
                .then(function() {

                    var deferred = $q.defer();
                    $scope.syncCategoriesImg = 1;

                    Category.synchronizeCategoryImages().then(function(categoriesImages) {
                            var promises = [];

                            angular.forEach(categoriesImages.data.categories_images, function(value, key) {
                                promises.push(
                                    Category.setCategoryImage(
                                        value.id,
                                        value.id_mod,
                                        value.id_cat,
                                        vm.devicePath === undefined ? value.image : cordova.file.externalApplicationStorageDirectory + 'BRF/Images/' + value.image.split('/').pop(),
                                        value.icon
                                    )
                                );
                            });

                            $q.all(promises).then(function() {
                                $scope.syncCategoriesImg = 2;
                                deferred.resolve();
                            });
                        })
                        .catch(function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                })
                .then(function() {

                    var deferred = $q.defer();
                    $scope.syncQuestions = 1;

                    Question.synchronizeQuestions().then(function(questions) {
                            var promises = [];

                            angular.forEach(questions.data.questions, function(value, key) {
                                var questionId = value.id;

                                promises.push(
                                    Question.setQuestion({
                                        questionId: value.id,
                                        categoryId: value.id_category,
                                        render: value.render,
                                        answer: value.answer,
                                        title: value.title,
                                        data: value.data,
                                        helper: value.helper,
                                        big: vm.devicePath === undefined ? value.big : cordova.file.externalApplicationStorageDirectory + 'BRF/Images/' + value.big.split('/').pop(),
                                        thumb: vm.devicePath === undefined ? value.thumb : cordova.file.externalApplicationStorageDirectory + 'BRF/Images/' + value.thumb.split('/').pop(),
                                        questionModuleId: value.id_question_mod,
                                        config: (typeof value.config === 'object') ? JSON.stringify(value.config) : value.config,
                                        styling: (typeof value.styling === 'object') ? JSON.stringify(value.styling) : value.styling,
                                        is_mandatory: value.is_mandatory,
                                        has_percent: value.has_percent,
                                        is_dashboard: value.is_dashboard,
                                        weight: value.weight,
                                        is_coaching: value.is_coaching,
                                        id_group: value.id_group
                                    }));

                                angular.forEach(value.pdv_filter, function(value, key) {
                                    promises.push(Question.setQuestionPdv(questionId, value));
                                });
                            });

                            $q.all(promises).then(function() {
                                $scope.syncQuestions = 2;
                                deferred.resolve();
                            });
                        })
                        .catch(function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                })
                .then(function() {

                    var deferred = $q.defer();
                    $scope.syncQuestionsGroups = 1;

                    Question.synchronizeQuestionsGroups().then(function(questionsGroups) {
                            var promises = [];

                            angular.forEach(questionsGroups.data.groups, function(value, key) {
                                promises.push(Question.setQuestionGroups(value.id, value.type, value.name, value.target_min, value.target_max));

                            });

                            $q.all(promises).then(function() {
                                $scope.syncQuestionsGroups = 2;
                                deferred.resolve();
                            });
                        })
                        .catch(function(error) {
                            deferred.reject(error);
                        });
                    return deferred.promise;
                })
                .then(function() {
                    var deferred = $q.defer();
                    $scope.syncImages = 1;

                    if (vm.devicePath === undefined) {
                        $scope.syncImages = 2;
                        deferred.resolve();
                        return;
                    }

                    var fileTransfer = new FileTransfer();

                    Image.getAllImages().then(function(urls) {

                            var promises = [];

                            var download = function(url) {
                                var downloadDeferred = $q.defer();

                                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                                    var fileTransfer = new FileTransfer();
                                    fileTransfer.download(
                                        encodeURI(url),
                                        cordova.file.externalApplicationStorageDirectory + 'BRF/Images/' + url.split('/').pop(),
                                        function(entry) {
                                            console.log('Success:' + url.split('/').pop());
                                            downloadDeferred.resolve();
                                        },
                                        function(error) {
                                            console.log('Error: ' + url.split('/').pop());
                                            downloadDeferred.reject(error);
                                        }
                                    )
                                });

                                return downloadDeferred.promise;
                            };

                            angular.forEach(urls.data.images, function(value, key) {

                                if (value.thumb !== undefined) {
                                    promises.push(download(value.thumb));
                                }

                                if (value.big !== undefined) {
                                    promises.push(download(value.big));
                                }
                            });

                            $q.all(promises).then(function() {
                                $scope.syncImages = 2;
                                deferred.resolve();
                            });

                        })
                        .catch(function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                })
                .then(function() {
                    var deferred = $q.defer();
                    $scope.syncDating = 1;

                    Dashboard.synchronizeDating().then(function(datings) {
                            var promises = [];

                            angular.forEach(datings.data.dating, function(value, key) {
                                promises.push(
                                    Dashboard.setDating(value.id, value.type, value.label)
                                );
                            });

                            $q.all(promises).then(function() {
                                $scope.syncDating = 2;
                                deferred.resolve();
                            });

                        })
                        .catch(function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                })
                .then(function() {
                    var deferred = $q.defer();
                    var userId = Login.getToken().id;
                    $scope.syncTarget = 1;

                    Dashboard.synchronizeTargets(userId).then(function(targets) {
                            var promises = [];

                            angular.forEach(targets.data.targets, function(value, key) {
                                promises.push(Dashboard.setTarget(value.target_coaching, userId))
                            });

                            $q.all(promises).then(function() {
                                $scope.syncTarget = 2;
                                deferred.resolve();
                            });
                        })
                        .catch(function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                })
                .then(function() {
                    $rootScope.$emit('synchronizationSuccessfulyFinished');
                    $location.path('/SyncOk/1');
                })
                .catch(function(error) {
                    console.log(error);
                    $location.path("/SyncNok");
                });
        }
    }
})();