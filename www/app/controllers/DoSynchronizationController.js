brfPhoneGapApp.controller('doSynchronizationController', function($scope, $route, channelService, 
	customerService, sellerService, moduleService, categoryService, questionService, surveyService, $q, $location, Category, Channel, Customer, Module, Question, Seller, Database){
	

	console.log(Database);
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


		Database.dropAll().then(function(){

			Database.init();
			
			var deferred = $q.defer();
			$scope.syncChannels = 1;
			
			Channel.synchronizeChannels().then(function(channels){

				var promises = [];

				angular.forEach(channels.data.channels, function(value, key){
					promises.push(Channel.setChannel(value.id, value.name));				
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

			Customer.synchronizeCustomers().then(function(customers){
				var promises = [];

				angular.forEach(customers.data.customers, function(value, key){
					promises.push(Customer.setCustomer(value.id, value["company_name"], value.cuit, value.address, value.type_pdv));			
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

			Customer.synchronizeCustomerTypes().then(function(customerTypes){
				var promises = [];

				angular.forEach(customerTypes.data.customer_types, function(value, key){
					promises.push(Customer.setCustomerType(value.id, value.name));								
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
			
			Seller.synchronizeSellers().then(function(sellers){
				var promises = [];

				angular.forEach(sellers.data.sellers, function(value, key){
					promises.push(Seller.setSeller(value.id, value.name));							
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

			Module.synchronizeModules().then(function(modules){
				var promises = [];

				angular.forEach(modules.data.modules, function(value, key){

					var moduleId = value.id;				

					promises.push(Module.setModule(value.id, value.behavior, value.mod_name, value.category_type));				

					angular.forEach(value.ids_channels, function(value, key){
						promises.push(Module.setModuleChannels(moduleId, value));					
					});		

					angular.forEach(value.ids_user_roles, function(value, key){
						promises.push(Module.setModuleRoles(moduleId, value));					
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

			Category.synchronizeCategories().then(function(categories){
				var promises = [];

				angular.forEach(categories.data.categories, function(value, key){
					var categoryId = value.id;

					promises.push(Category.setCategory(value.id, value.type, value.name));						

					angular.forEach(value.id_channels, function(value, key){
						promises.push(Category.setCategoryChannel(categoryId, value));					
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

			Category.synchronizeCategoryImages().then(function(categoriesImages){
				var promises = [];

				angular.forEach(categoriesImages.data.categories_images, function(value, key){
					promises.push(Category.setCategoryImage(value.id, value.id_mod, value.id_cat, value.image, value.icon));							
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

			Question.synchronizeQuestions().then(function(questions){
				var promises = [];

				angular.forEach(questions.data.questions, function(value, key){
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
						big: value.big, 
						thumb: value.thumb, 
						questionModuleId: value.id_question_mod,
						config: (typeof value.config === 'object') ? JSON.stringify(value.config) : value.config,
						styling: (typeof value.styling === 'object') ? JSON.stringify(value.styling) : value.styling
					}));
				
					angular.forEach(value.pdv_filter, function(value, key){
						promises.push(Question.setQuestionPdv(questionId, value));
					});
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