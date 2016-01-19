brfPhoneGapApp.factory('categoryService', ['$http', '$q', function($http, $q){
	
	return {
		synchronizeCategories: function(){
			return $http.get('http://ws.brf-horizonte.com/get/categories/?token=560a100abad225d5afdf4fc6e5334917');
		},
		synchronizeCategoryImages: function(){
			return $http.get('http://ws.brf-horizonte.com/get/categories/images/?token=560a100abad225d5afdf4fc6e5334917');
		},
		setCategory: function(categoryId, type, name){

			var deferred = $q.defer();

			db.transaction(function(tx){
				return tx.executeSql('INSERT INTO Category(categoryId, type, name) VALUES(?, ?, ?)', [categoryId, type, name], function(tx, res){
					deferred.resolve();
					return true;
				});
			});

			return deferred.promise;			
		},
		setCategoryChannel: function(categoryId, channelId){
			var deferred = $q.defer();

			db.transaction(function(tx){
				return tx.executeSql('INSERT INTO CategoryChannels(categoryId, channelId) VALUES(?, ?)', [categoryId, channelId], function(tx, res){
					deferred.resolve();
					return true;
				});
			});

			return deferred.promise;	
		},
		setCategoryImage: function(imageId, idMod, idCat, image, icon){
			var deferred = $q.defer();

			console.log("ejecutar!");
			console.log(imageId);
			console.log(idMod);
			console.log(imageId);
			console.log(image);


			db.transaction(function(tx){
				return tx.executeSql('INSERT INTO CategoryImage(imageId, idMod, idCat, image, icon) VALUES(?, ?, ?, ?, ?)', [imageId, idMod, idCat, image, icon], function(tx, res){
					deferred.resolve();
					return true;
				});
			});

			return deferred.promise;
		}
	};	

}]);