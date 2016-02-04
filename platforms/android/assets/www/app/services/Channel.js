brfPhoneGapApp.factory('Channel', ['$http', 'Database', function($http, Database){
	var self = this;

	self.synchronizeChannels = function(){
		return $http.get('http://ws.brf-horizonte.com/get/channels/?token=560a100abad225d5afdf4fc6e5334917');
	};

	self.setChannel = function(id, name){
		return Database.query('INSERT INTO Channel(id, name) VALUES(?, ?)', [id, name])
			.then(function (result){
				return true;
			});
	};

	self.getChannels = function(){
		return Database.query('Select id, name From Channel')
			.then(function (result){
				return Database.fetchAll(result);
			});
	};

	return self;
}]);