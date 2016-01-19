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
		}
	};	

}]);