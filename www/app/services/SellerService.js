brfPhoneGapApp.factory('sellerService', ['$http', '$q', function($http, $q){
	
	return {
		synchronizeSellers: function(){
			return $http.get('http://ws.brf-horizonte.com/get/sellers/?token=560a100abad225d5afdf4fc6e5334917');
		},
		setSeller: function(id, name){
			var deferred = $q.defer();

			db.transaction(function(tx){
				return tx.executeSql('INSERT INTO Seller(id, name) VALUES(?, ?)', [id, name], function(tx, res){
					deferred.resolve();
					return true;
				});
			});

			return deferred.promise;
		},
		getSellers: function(){
			var deferred = $q.defer(), result = [];

			db.transaction(function(tx){
				tx.executeSql('Select id, name From Seller', [], function(tx, res){

	               for(var i = 0; i < res.rows.length; i++){
	                    result.push({ id: res.rows.item(i).id, name: res.rows.item(i).name });
	                }
	                
	                deferred.resolve(result);
				});
			});

			return deferred.promise;
		},
		recreateSchema: function(){
			var deferred = $q.defer();

			db.transaction(function(tx){
				tx.executeSql('DROP TABLE IF EXISTS Seller', [], function(tx, res){
					tx.executeSql('CREATE TABLE IF NOT EXISTS Seller(id integer primary key, name text)', [], function(){
						deferred.resolve();
					}); 
				});
			});

			return deferred.promise;			
		}
	};	

}]);