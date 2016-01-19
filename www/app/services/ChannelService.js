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
		}
	};	

}]);