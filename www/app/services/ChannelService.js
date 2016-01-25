brfPhoneGapApp.factory('channelService', ['$http', '$q', function($http, $q){
	
	return {
		synchronizeChannels: function(){
			return $http.get('http://ws.brf-horizonte.com/get/channels/?token=560a100abad225d5afdf4fc6e5334917');
		},
		setChannel: function(id, name){
			var deferred = $q.defer();

			db.transaction(function(tx){
				return tx.executeSql('INSERT INTO Channel(id, name) VALUES(?, ?)', [id, name], function(tx, res){
					deferred.resolve();
					return true;
				});
			});

			return deferred.promise;
		},
		getChannels: function(){
			var deferred = $q.defer(), result = [];

			db.transaction(function(tx){
				tx.executeSql('Select id, name From Channel', [], function(tx, res){

	               for(var i = 0; i < res.rows.length; i++){
	                    result.push({ id: res.rows.item(i).channelId, name: res.rows.item(i).name });
	                }
	                
	                deferred.resolve(result);
				});
			});

			return deferred.promise;
		},
		recreateSchema: function(){
			var deferred = $q.defer();

			db.transaction(function(tx){
				tx.executeSql('DROP TABLE IF EXISTS Channel', [], function(tx, res){
					tx.executeSql('CREATE TABLE IF NOT EXISTS Channel(id integer primary key, name text)',[], function(tx, res){
						deferred.resolve();
					});
				});
			});

			return deferred.promise;
		}
	};	

}]);