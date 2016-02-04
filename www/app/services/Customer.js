brfPhoneGapApp.factory('Customer', ['$http', 'Database', function($http, Database){
	var self = this;

	self.synchronizeCustomers = function (){
		return $http.get('http://ws.brf-horizonte.com/get/customers/?token=560a100abad225d5afdf4fc6e5334917');
	};

	self.synchronizeCustomerTypes = function (argument) {
		return $http.get('http://ws.brf-horizonte.com/get/customers/type/?token=560a100abad225d5afdf4fc6e5334917');
	};

	self.setCustomer = function (id, companyName, cuit, address, pdvType) {
		return Database.query('INSERT INTO Customer(customerId, companyName, cuit, address, pdvType) VALUES(?, ?, ?, ?, ?)', [id, companyName, cuit, address, pdvType])
			.then(function (result){
				return true;
			});
	};

	self.setCustomerType = function (id, name) {
		return Database.query('INSERT INTO CustomerType(id, name) VALUES(?, ?)', [id, name])
			.then(function (result){
				return true;
			});			
	};

	self.getCustomers = function (){
		return Database.query('SELECT customerId, address FROM Customer LIMIT 0, 10')
			.then(function (result){
				return Database.fetchAll(result);
			});
	};

	self.getCustomerTypes = function (){
		return Database.query('SELECT id, name FROM CustomerType')
			.then(function (result){
				return Database.fetchAll(result);
			});
	};

	return self;

}]);