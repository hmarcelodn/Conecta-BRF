brfPhoneGapApp.factory('Survey', ['$http', 'Database', function($http, Database){
	var self = this;

	self.setSurvey = function(survey){
		return Database.query('INSERT INTO Survey(survey, syncStatus) VALUES (?, ?)', [survey, 0])
			.then(function (result){
				return true;
			});
	};

	self.getPendingSurvey = function(){
		return Database.query('SELECT id, survey, syncStatus FROM Survey WHERE syncStatus = 0 LIMIT 0,1')
			.then(function (result){
				return Database.fetch(result);
			});
	};

	self.closeSurvey = function(){
		return Database.query('UPDATE Survey SET syncStatus = 1 WHERE syncStatus = 0')
			.then(function (result){
				return true;
			});
	};

	self.enableAuditMode = function(channelId, pdvId, sellerId){
		window.localStorage.setItem(auditModeKey, true);
		window.localStorage.setItem(channelKeyId, channelId);
		window.localStorage.setItem(pdvKeyId, pdvId);
		window.localStorage.setItem(sellerKeyId, sellerId);		
	};

	self.disableAuditMode = function(){
		window.localStorage.setItem(auditModeKey, false);
		window.localStorage.setItem(channelKeyId, 0);
		window.localStorage.setItem(pdvKeyId, 0);
		window.localStorage.setItem(sellerKeyId, 0);
	};

	self.getAuditMode = function(){
		if(window.localStorage.getItem(auditModeKey) === undefined){
			window.localStorage.setItem(auditModeKey, false);
		}

		return (window.localStorage.getItem(auditModeKey) === 'true');
	};

	self.getAuditChannel = function(){
		if(window.localStorage.getItem(channelKeyId) === undefined){
			window.localStorage.setItem(channelKeyId, 0);
		}

		return window.localStorage.getItem(channelKeyId);
	};

	self.getAuditPdv = function(){
		if(window.localStorage.getItem(pdvKeyId) === undefined){
			window.localStorage.setItem(pdvKeyId, 0);
		}

		return window.localStorage.getItem(pdvKeyId);
	};

	self.getAuditSeller = function(){
		if(window.localStorage.getItem(sellerKeyId) === undefined){
			window.localStorage.setItem(sellerKeyId, 0);
		}

		return window.localStorage.getItem(sellerKeyId);
	};

	self.setQuestionAnswer = function(surveyId, id, data){
		return Database.query('UPDATE SurveyQuestionsResults SET JSONData = ? WHERE questionId = ? AND surveyId = ?', [data, id, surveyId])
			.then(function (result){
				if(result.rowsAffected === 0){
					return Database.query('INSERT INTO SurveyQuestionsResults(surveyId, questionId, JSONData) VALUES (?, ?, ?)', [surveyId, id, data])
						.then(function (result){
							return true;
						});
				}
				else{
					return true;
				}				
			});
	};

	self.setNoBrf = function(surveyId, noBrfResult){
		return Database.query('UPDATE SurveyNoBrfResults SET noBrf = ? WHERE surveyId = ?', [noBrfResult, surveyId])
			.then(function (result){
				return Database.query('INSERT INTO SurveyNoBrfResults(surveyId, noBrf) VALUES(?, ?)', [surveyId, noBrfResult])
					.then(function (result){
						return true;
					});
			});
	};

	self.setObservations = function(surveyId, observations){
		return Database.query('UPDATE SurveyObservationResults SET observations = ? WHERE surveyId = ?', [observations, surveyId])
			.then(function (result){
				return Database.query('INSERT INTO SurveyObservationResults(surveyId, observations) VALUES(?, ?)', [surveyId, observations])
					.then(function (result){
						return true;
					});
			});
	};

	self.getNoBrf = function(surveyId){
		return Database.query('SELECT noBrf FROM SurveyNoBrfResults WHERE surveyId = ?',[surveyId])
			.then(function (result){
				return Database.fetch(result);
			});
	};

	self.getObservations = function(){
		return Database.query('SELECT observations FROM SurveyObservationResults WHERE surveyId = ?', [surveyId])
			.then(function (result){
				return Database.fetch(result);
			});		
	};

	return self;
}]);