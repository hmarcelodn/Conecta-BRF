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

			db.transaction(function(tx){
				return tx.executeSql('INSERT INTO CategoryImage(imageId, idMod, idCat, image, icon) VALUES(?, ?, ?, ?, ?)', [imageId, idMod, idCat, image, icon], function(tx, res){
					deferred.resolve();
					return true;
				});
			});

			return deferred.promise;
		},
		recreateSchema: function(){
			var deferred = $q.defer();

			db.transaction(function(tx){
				tx.executeSql('DROP TABLE IF EXISTS Category', [], function(tx, res){
					tx.executeSql('DROP TABLE IF EXISTS CategoryChannels', [], function(tx, res){
						tx.executeSql('DROP TABLE IF EXISTS CategoryImage', [], function(tx, res){
				            tx.executeSql('CREATE TABLE IF NOT EXISTS Category(id integer primary key, categoryId integer, type integer, name text)', [], function(tx, res){
				            	tx.executeSql('CREATE TABLE IF NOT EXISTS CategoryChannels(id integer primary key, categoryId, channelId)', [], function(tx, res){
				            		tx.executeSql('CREATE TABLE IF NOT EXISTS CategoryImage(id integer primary key, imageId integer, idMod integer, idCat integer, image text, icon text)', [], function(){
										deferred.resolve();
				            		}); 
				            	});
				            });           							
						});						
					});					
				});
			});

			return deferred.promise;			
		},
		getCategories: function(){
			var deferred = $q.defer(), result = [];

			db.transaction(function(tx){
				tx.executeSql('SELECT id, categoryId, type, name FROM Category', [], function(tx, res){

					for(var i = 0; i < res.rows.length; i++){
	                    result.push({ 
	                    	id: res.rows.item(i).id, 
	                    	categoryId: res.rows.item(i).categoryId,
	                    	type: res.rows.item(i).type,
	                    	name: res.rows.item(i).name
	                    });
	                }

					deferred.resolve(result);
				});
			});

			return deferred.promise;
		}
	};	

}]);