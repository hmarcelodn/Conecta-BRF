var auditModeKey = "audit-mode";
var pdvKeyId = "pdv-id"; 
var channelKeyId = "channel-id";
var sellerKeyId = "seller-id";

brfPhoneGapApp.factory('surveyService', ['$http', '$q', '$timeout', function($http, $q, $timeout){
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
		getPendingSurvey: function(){
			var deferred = $q.defer(), result = [];

			db.transaction(function(tx){
				tx.executeSql('SELECT id, survey, syncStatus FROM Survey WHERE syncStatus = 0 LIMIT 0,1', [], function(tx, res){

	               for(var i = 0; i < res.rows.length; i++){
	                    result.push(
	                    	{ 
	                    		id: res.rows.item(i).id,
	                    		survey: res.rows.item(i).survey
	                    	}
	                    );
	                }

					deferred.resolve(result[0]);
				});
			});

			return deferred.promise;			
		},
		closeSurvey: function(){
			var deferred = $q.defer();

			db.transaction(function(tx){
				tx.executeSql('UPDATE Survey SET syncStatus = 1 WHERE syncStatus = 0', [], function(tx, res){
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
						tx.executeSql('DROP TABLE IF EXISTS SurveyQuestionsResults', [], function(tx, res){
							tx.executeSql('CREATE TABLE IF NOT EXISTS SurveyQuestionsResults(id integer primary key, surveyId integer, questionId integer, JSONData text)', [], function(tx, res){
								deferred.resolve();
							});							
						});						
					}); 
				});
			});

			return deferred.promise;				
		},
		enableAuditMode: function(channelId, pdvId, sellerId){
			window.localStorage.setItem(auditModeKey, true);
			window.localStorage.setItem(channelKeyId, channelId);
			window.localStorage.setItem(pdvKeyId, pdvId);
			window.localStorage.setItem(sellerKeyId, sellerId);
		},
		disableAuditMode: function(){
			window.localStorage.setItem(auditModeKey, false);
			window.localStorage.setItem(channelKeyId, 0);
			window.localStorage.setItem(pdvKeyId, 0);
			window.localStorage.setItem(sellerKeyId, 0);
		},
		getAuditMode: function(){
			if(window.localStorage.getItem(auditModeKey) === undefined){
				window.localStorage.setItem(auditModeKey, false);
			}

			return (window.localStorage.getItem(auditModeKey) === 'true');
		},
		getAuditChannel: function(){
			if(window.localStorage.getItem(channelKeyId) === undefined){
				window.localStorage.setItem(channelKeyId, 0);
			}

			return window.localStorage.getItem(channelKeyId);
		},
		getAuditPdv: function(){
			if(window.localStorage.getItem(pdvKeyId) === undefined){
				window.localStorage.setItem(pdvKeyId, 0);
			}

			return window.localStorage.getItem(pdvKeyId);
		},
		getAuditSeller: function(){
			if(window.localStorage.getItem(sellerKeyId) === undefined){
				window.localStorage.setItem(sellerKeyId, 0);
			}

			return window.localStorage.getItem(sellerKeyId);
		},
		setQuestionAnswer: function(surveyId, id, data){
			var deferred = $q.defer();

			db.transaction(function(tx){
				tx.executeSql('UPDATE SurveyQuestionsResults SET JSONData = ? WHERE questionId = ? AND surveyId = ?', [data, id, surveyId], function(tx, res){
					if(res.rowsAffected === 0){
						tx.executeSql('INSERT INTO SurveyQuestionsResults(surveyId, questionId, JSONData) VALUES (?, ?, ?)', [surveyId, id, data], function(tx, res){
							deferred.resolve();
						});
					}
					else{
						deferred.resolve();
					}
				});
			});

			return deferred.promise;
		}
	}
}]);