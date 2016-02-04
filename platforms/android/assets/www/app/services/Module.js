brfPhoneGapApp.factory('Module', ['$http', 'Database', function($http, Database){
	var self = this;

	self.synchronizeModules = function(){
		return $http.get('http://ws.brf-horizonte.com/get/modules/?token=560a100abad225d5afdf4fc6e5334917');
	};

	self.setModule = function (moduleId, behavior, modName, categoryType, color, icon){
		Database.query('INSERT INTO Module(moduleId, behavior, modName, categoryType, color, icon) VALUES(?, ?, ?, ?, ?, ?)', [moduleId, behavior, modName, categoryType, color, icon])
			.then(function (result){
				return true;
			});
	};

	self.setModuleChannels = function(moduleId, channelId){
		Database.query('INSERT INTO ModuleChannels(moduleId, channelId) VALUES(?, ?)', [moduleId, channelId])
			.then(function (result){
				return true;
			});
	};

	self.setModuleRoles = function(moduleId, roleId){
		Database.query('INSERT INTO ModuleUserRoles(moduleId, roleId) VALUES(?, ?)', [moduleId, roleId])
			.then(function (result){
				return true;
			});
	};

	self.getModuleByName = function(moduleName){
		return Database.query('SELECT id, moduleId, behavior, modName, categoryType, color, icon FROM Module WHERE modName = ?', [moduleName])
			.then(function (result){
				return Database.fetchAll(result);
			});		
	};

	return self;
}]);