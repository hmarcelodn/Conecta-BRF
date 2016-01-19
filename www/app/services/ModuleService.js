brfPhoneGapApp.factory('moduleService', ['$http', '$q', function($http, $q){
	
	return {
		synchronizeModules: function(){
			return $http.get('http://ws.brf-horizonte.com/get/modules/?token=560a100abad225d5afdf4fc6e5334917');
		},
		setModule: function(moduleId, behavior, modName, categoryType, color, icon){
			var deferred = $q.defer();

			db.transaction(function(tx){
				return tx.executeSql('INSERT INTO Module(moduleId, behavior, modName, categoryType, color, icon) VALUES(?, ?, ?, ?, ?, ?)', [moduleId, behavior, modName, categoryType, color, icon], function(tx, res){
					deferred.resolve();
					return true;
				});
			});

			return deferred.promise;
		},
		setModuleChannels: function(moduleId, channelId){
			var deferred = $q.defer();

			db.transaction(function(tx){
				return tx.executeSql('INSERT INTO ModuleChannels(moduleId, channelId) VALUES(?, ?)', [moduleId, channelId], function(tx, res){
					deferred.resolve();
					return true;
				});
			});

			return deferred.promise;
		},
		setModuleRoles: function(moduleId, roleId){
			var deferred = $q.defer();

			db.transaction(function(tx){
				return tx.executeSql('INSERT INTO ModuleUserRoles(moduleId, roleId) VALUES(?, ?)', [moduleId, roleId], function(tx, res){
					deferred.resolve();
					return true;
				});
			});

			return deferred.promise;			
		}
	};	

}]);