brfPhoneGapApp.factory('Module', ['$http', 'Database', function($http, Database){
	var self = this;

	self.synchronizeModules = function(){
		return $http.get('http://ws.brf-horizonte.com/get/modules/?token=560a100abad225d5afdf4fc6e5334917');
	};

	self.setModule = function (moduleId, behavior, modName, categoryType, color, icon, slug){
		Database.query('INSERT INTO Module(moduleId, behavior, modName, categoryType, color, icon, slug) VALUES(?, ?, ?, ?, ?, ?, ?)', [moduleId, behavior, modName, categoryType, color, icon, slug])
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
				return Database.fetch(result);
			});		
	};

	self.getModules = function(channelId, roleId){
		var query = 'SELECT DISTINCT mod.id, mod.moduleId, mod.behavior, mod.modName, mod.categoryType, mod.color, mod.icon, mod.slug FROM Module mod' +
						' INNER JOIN ModuleChannels modcha ON modcha.moduleId = mod.moduleId' +
						' INNER JOIN ModuleUserRoles modur ON modur.moduleId = mod.moduleId' +
						' WHERE modcha.channelId = ?' +
						' AND modur.roleId = ?';

		return Database.query(query, [channelId, roleId])
			.then(function (result){
				return Database.fetchAll(result);
			});
	};

	self.getDefaultModules = function(channelId, roleId){
		var query = 'SELECT DISTINCT mod.id, mod.moduleId, mod.behavior, mod.modName, mod.categoryType, mod.color, mod.icon, mod.slug FROM Module mod' +
						' INNER JOIN ModuleChannels modcha ON modcha.moduleId = mod.moduleId' +
						' INNER JOIN ModuleUserRoles modur ON modur.moduleId = mod.moduleId' +
						' WHERE modcha.channelId = ?' +
						' AND modur.roleId = ? LIMIT 0,1';

		return Database.query(query, [channelId, roleId])
			.then(function (result){
				return Database.fetch(result);
			});
	};

	return self;
}]);