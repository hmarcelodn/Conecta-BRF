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
		},
		recreateSchema: function(){
			var deferred = $q.defer();

			db.transaction(function(tx){
				tx.executeSql('DROP TABLE IF EXISTS Module', [], function(tx, res){
					tx.executeSql('DROP TABLE IF EXISTS ModuleChannels', [], function(tx, res){
						tx.executeSql('DROP TABLE IF EXISTS ModuleUserRoles', [], function(tx, res){
				            tx.executeSql('CREATE TABLE IF NOT EXISTS Module(id integer primary key, moduleId integer, behavior text, modName text, categoryType integer, color text, icon text)', [], function(){
				            	tx.executeSql('CREATE TABLE IF NOT EXISTS ModuleChannels(id integer primary key, moduleId integer, channelId integer)', [], function(){
				            		tx.executeSql('CREATE TABLE IF NOT EXISTS ModuleUserRoles(id integer primary key, moduleId integer, roleId integer)', [], function(){
											deferred.resolve();            			
				            		});
				            	});
				            });
						});						
					});					
				});
			});

			return deferred.promise;			
		}
	};	

}]);