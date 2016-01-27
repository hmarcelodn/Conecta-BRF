var auditModeKey = "audit-mode";

brfPhoneGapApp.factory('surveyService', ['$http', '$q', function($http, $q){
	return {
		setSurvey: function(survey, data, surveyType){
			var deferred = $q.defer();

			db.transaction(function(tx){
				tx.executeSql('INSERT INTO Survey(survey, JSONData, syncStatus, surveyType)', [survey, data, 0, surveyType], function(tx, res){
					deferred.resolve();
				});
			});

			return deferred.promise;
		},
		getSurvey: function(){
			
		},
		recreateSchema: function(){
			var deferred = $q.defer();

			db.transaction(function(tx){
				tx.executeSql('DROP TABLE IF EXISTS Survey', [], function(tx, res){
					tx.executeSql('CREATE TABLE IF NOT EXISTS Survey(id integer primary key, survey text, JSONData text, syncStatus boolean, surveyType int)', [], function(tx, res){
						deferred.resolve();
					}); 
				});
			});

			return deferred.promise;				
		},
		setSurveyTimeStamp: function(){

		},
		getSurveyTimeStamp: function(){

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