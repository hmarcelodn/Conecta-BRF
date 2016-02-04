brfPhoneGapApp.factory('moduleService', ['$http', '$q', function($http, $q){
	
	return {
		synchronizeModules: function(){
			return $http.get('http://ws.brf-horizonte.com/get/modules/?token=560a100abad225d5afdf4fc6e5334917');
		},
		setModule: function(moduleId, behavior, modName, categoryType, color, icon, slug){
			var deferred = $q.defer();

			db.transaction(function(tx){
				return tx.executeSql('INSERT INTO Module(moduleId, behavior, modName, categoryType, color, icon, slug) VALUES(?, ?, ?, ?, ?, ?, ?)', [moduleId, behavior, modName, categoryType, color, icon, slug], function(tx, res){
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
				            tx.executeSql('CREATE TABLE IF NOT EXISTS Module(id integer primary key, moduleId integer, behavior text, modName text, categoryType integer, color text, icon text, slug text)', [], function(){
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
		},
		getModuleByName: function(moduleName){

			var deferred = $q.defer();
			var result = [];

			db.transaction(function(tx){
				tx.executeSql('SELECT id, moduleId, behavior, modName, categoryType, color, icon FROM Module WHERE modName = ?', [moduleName], function(tx, res){
					for(var i = 0; i < res.rows.length; i++){
	                    result.push(
	                    	{ 
	                    		id: res.rows.item(i).id, 
	                    		moduleId: res.rows.item(i).moduleId,
	                    		behavior: res.rows.item(i).behavior,
	                    		modName: res.rows.item(i).modName,
	                    		categoryType: res.rows.item(i).categoryType,
	                    		color: res.rows.item(i).color,
	                    		icon: res.rows.item(i).icon
	                    	}
	                    );
	                }
					deferred.resolve(result);
				});
			});

			return deferred.promise;
		},
		getModules: function(channelId, roleId){
			var deferred = $q.defer();
			var result = [];

			var query = 'SELECT DISTINCT mod.id, mod.moduleId, mod.behavior, mod.modName, mod.categoryType, mod.color, mod.icon, mod.slug FROM Module mod' +
						' INNER JOIN ModuleChannels modcha ON modcha.moduleId = mod.moduleId' +
						' INNER JOIN ModuleUserRoles modur ON modur.moduleId = mod.moduleId' +
						' WHERE modcha.channelId = ?' +
						' AND modur.roleId = ?';

			db.transaction(function(tx){
				tx.executeSql(query, [channelId, roleId], function(tx, res){

					for(var i = 0; i < res.rows.length; i++){
	                    result.push(
	                    	{ 
	                    		id: res.rows.item(i).id, 
	                    		moduleId: res.rows.item(i).moduleId,
	                    		behavior: res.rows.item(i).behavior,
	                    		modName: res.rows.item(i).modName,
	                    		categoryType: res.rows.item(i).categoryType,
	                    		color: res.rows.item(i).color,
	                    		icon: res.rows.item(i).icon,
	                    		slug: res.rows.item(i).slug
	                    	}
	                    );
	                }
					deferred.resolve(result);	                
				});
			});

			return deferred.promise;
		}
	};	

}]);