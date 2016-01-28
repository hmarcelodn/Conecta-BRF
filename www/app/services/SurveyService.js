var auditModeKey = "audit-mode";

brfPhoneGapApp.factory('surveyService', ['$http', '$q', function($http, $q){
	return {
		setSurvey: function(survey){
			var deferred = $q.defer();

			db.transaction(function(tx){
				tx.executeSql('INSERT INTO Survey(survey, syncStatus) VALUES (?, ?)', [survey, 0], function(tx, res){
					deferred.resolve();
				});
			});

			return deferred.promise;
		},
		getPendingSurvey: function(type){
			var deferred = $q.defer();

			db.transaction(function(tx){
				tx.executeSql('SELECT survey FROM Survey WHERE syncStatus = 0', [], function(tx, res){
					deferred.resolve();
				});
			});

			return deferred.promise;			
		},
		closeSurvey: function(){
			var deferred = $q.defer();

			db.transaction(function(tx){
				tx.executeSql('UPDATE Survey SET syncStatus = 1', [], function(tx, res){
					deferred.resolve();
				});
			});

			return deferred.promise;	
		},
		recreateSchema: function(){
			var deferred = $q.defer();

			db.transaction(function(tx){
				tx.executeSql('DROP TABLE IF EXISTS Survey', [], function(tx, res){
					tx.executeSql('CREATE TABLE IF NOT EXISTS Survey(id integer primary key, survey text, syncStatus integer)', [], function(tx, res){
						tx.executeSql('DROP TABLE IF EXISTS SurveyResults', [], function(tx, res){
							tx.executeSql('CREATE TABLE IF NOT EXISTS SurveyResults(id integer primary key, surveyId integer, questionId integer, JSONValue text)', [], function(){
								deferred.resolve();
							});							
						});						
					}); 
				});
			});

			return deferred.promise;				
		},
		enableAuditMode: function(){
			window.localStorage.setItem(auditModeKey, true);
		},
		disableAuditMode: function(){
			window.localStorage.setItem(auditModeKey, false);
		},
		getAuditMode: function(){
			if(window.localStorage.getItem(auditModeKey) === undefined){
				window.localStorage.setItem(auditModeKey, false);
			}

			return (window.localStorage.getItem(auditModeKey) === 'true');
		}
	}
}]);