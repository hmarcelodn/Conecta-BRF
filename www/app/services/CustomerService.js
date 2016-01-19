brfPhoneGapApp.factory('customerService', ['$http', '$q', function($http, $q){	

	return {
		synchronizeCustomers: function(){
			return $http.get('http://ws.brf-horizonte.com/get/customers/?token=560a100abad225d5afdf4fc6e5334917');
		},
		synchronizeCustomerTypes: function(){
			return $http.get('http://ws.brf-horizonte.com/get/customers/type/?token=560a100abad225d5afdf4fc6e5334917');
		},
		setCustomer: function(id, companyName, cuit, address, deferred){
			var deferred = $q.defer();

			db.transaction(function(tx){
				return tx.executeSql('INSERT INTO Customer(customerId, companyName, cuit, address) VALUES(?, ?, ?, ?)', [id, companyName, cuit, address], function(tx, res){
					deferred.resolve();
					return true;
				});
			});

			return deferred.promise;
		},
		setCustomerType: function(id, name){
			var deferred = $q.defer();

			db.transaction(function(tx){
				return tx.executeSql('INSERT INTO CustomerType(id, name) VALUES(?, ?)', [id, name], function(tx, res){
					deferred.resolve();
					return true;
				});
			});

			return deferred.promise;
		}
	};	

}]);