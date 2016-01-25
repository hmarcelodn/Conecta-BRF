brfPhoneGapApp.controller('doSynchronizationController', function($scope, $route, channelService, 
	customerService, sellerService, moduleService, categoryService, questionService, $q, $location){
	
	// 0 - Waiting
	// 1 - Running
	// 2 - Success
	$scope.syncChannels = 0;
	$scope.syncCustomers = 0;
	$scope.syncCustomersType = 0;
	$scope.syncSellers = 0;
	$scope.syncModules = 0;
	$scope.syncCategories = 0;
	$scope.syncCategoriesImg = 0;
	$scope.syncQuestions = 0;

	var dropSchemaPromises = [];

	dropSchemaPromises.push(channelService.recreateSchema());
	dropSchemaPromises.push(customerService.recreateSchema());
	dropSchemaPromises.push(sellerService.recreateSchema());
	dropSchemaPromises.push(moduleService.recreateSchema());
	dropSchemaPromises.push(categoryService.recreateSchema());
	dropSchemaPromises.push(questionService.recreateSchema());

		$q.all(dropSchemaPromises).then(function(){

			var deferred = $q.defer();
			$scope.syncChannels = 1;
			
			channelService.synchronizeChannels().then(function(channels){

				var promises = [];

				angular.forEach(channels.data.channels, function(value, key){
					promises.push(channelService.setChannel(value.id, value.name));				
				});

				$q.all(promises).then(function(){
					$scope.syncChannels = 2;	
					deferred.resolve();		
				});
			})
			.catch(function(error){			
				deferred.reject(error);
			});

			return deferred.promise;
		})			
		.then(function(){

			var deferred = $q.defer();
			$scope.syncCustomers = 1;

			customerService.synchronizeCustomers().then(function(customers){
				var promises = [];

				angular.forEach(customers.data.customers, function(value, key){
					promises.push(customerService.setCustomer(value.id, value["company_name"], value.cuit, value.address));			
				});

				$q.all(promises).then(function(){
					$scope.syncCustomers = 2;
					deferred.resolve();
				});
			})
			.catch(function(error){			
				deferred.reject(error);
			});

			return deferred.promise;
		})		
		.then(function(){
		
			var deferred = $q.defer();
			$scope.syncCustomersType = 1;

			customerService.synchronizeCustomerTypes().then(function(customerTypes){
				var promises = [];

				angular.forEach(customerTypes.data.customer_types, function(value, key){
					promises.push(customerService.setCustomerType(value.id, value.name));								
				});

				$q.all(promises).then(function(){					
					$scope.syncCustomersType = 2;	
					deferred.resolve();			
				});
			})
			.catch(function(error){			
				deferred.reject(error);
			});

			return deferred.promise;
		})		
		.then(function(){

			var deferred = $q.defer();			
			$scope.syncSellers = 1;
			
			sellerService.synchronizeSellers().then(function(sellers){
				var promises = [];

				angular.forEach(sellers.data.sellers, function(value, key){
					promises.push(sellerService.setSeller(value.id, value.name));							
				});

				$q.all(promises).then(function(){
					$scope.syncSellers = 2;		
					deferred.resolve();		
				});
			})
			.catch(function(error){			
				deferred.reject(error);
			});

			return deferred.promise;
		})
		.then(function(){

			var deferred = $q.defer();
			$scope.syncModules = 1;

			moduleService.synchronizeModules().then(function(modules){
				var promises = [];

				angular.forEach(modules.data.modules, function(value, key){

					var moduleId = value.id;				

					promises.push(moduleService.setModule(value.id, value.behavior, value.mod_name, value.category_type));				

					angular.forEach(value.ids_channels, function(value, key){
						promises.push(moduleService.setModuleChannels(moduleId, value));					
					});		

					angular.forEach(value.ids_user_roles, function(value, key){
						promises.push(moduleService.setModuleRoles(moduleId, value));					
					});
				});

				$q.all(promises).then(function(){
					$scope.syncModules = 2;		
					deferred.resolve();		
				});
			})
			.catch(function(error){			
				deferred.reject(error);
			});

			return deferred.promise;
		})
		.then(function(categories){

			var deferred = $q.defer();
			$scope.syncCategories = 1;

			categoryService.synchronizeCategories().then(function(categories){
				var promises = [];

				angular.forEach(categories.data.categories, function(value, key){
					var categoryId = value.id;

					promises.push(categoryService.setCategory(value.id, value.type, value.name));						

					angular.forEach(value.id_channels, function(value, key){
						promises.push(categoryService.setCategoryChannel(categoryId, value));					
					});
				});

				$q.all(promises).then(function(){
					$scope.syncCategories = 2;		
					deferred.resolve();		
				});
			})
			.catch(function(error){			
				deferred.reject(error);
			});

			return deferred.promise;
		})		
		.then(function(){

			var deferred = $q.defer();
			$scope.syncCategoriesImg = 1;

			categoryService.synchronizeCategoryImages().then(function(categoriesImages){
				var promises = [];

				angular.forEach(categoriesImages.data.categories_images, function(value, key){
					promises.push(categoryService.setCategoryImage(value.id, value.id_mod, value.id_cat, value.image, value.icon));							
				});

				$q.all(promises).then(function(){
					$scope.syncCategoriesImg = 2;	
					deferred.resolve();						
				});
			})
			.catch(function(error){			
				deferred.reject(error);
			});

			return deferred.promise;
		})
		.then(function(){

			var deferred = $q.defer();
			$scope.syncQuestions = 1;

			questionService.synchronizeQuestions().then(function(questions){
				var promises = [];

				angular.forEach(questions.data.questions, function(value, key){
					promises.push(questionService.setQuestion(value.id, value.id_category, value.pdv_filter, value.render, value.answer, value.title, value.data, value.helper, value.big, value.thumb));
				});

				$q.all(promises).then(function(){
					$scope.syncQuestions = 2;
					deferred.resolve();
					$location.path("/SyncOk");
				});
			})
			.catch(function(error){			
				deferred.reject(error);
			});
			
			return deferred.promise;
		})
		.catch(function(error){
			console.log(error);
			$location.path("/SyncNok");
		});	
});