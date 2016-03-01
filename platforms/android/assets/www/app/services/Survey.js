var auditModeKey = 'audit-mode';
var channelKeyId = 'channel-id';
var pdvKeyId = 'pdv-id';
var sellerKeyId = 'seller-id';
var lastChannelKeyId = 'last-channel-id';
var lastSellerKeyId = 'last-seller-id';
var lastPdvKeyId = 'last-pdv-id';
var auditIdKey = 'audit-id';

(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .factory('Survey', Survey);

    Survey.$inject = ['$http', 'Database'];
    function Survey($http, Database) {
        var self = this;

        self.setSurvey = function(survey, channelId, pdvId, sellerId, userId){
            return Database.query("INSERT INTO Survey(survey, syncStatus, channelId, pdvId, sellerId, userId, date, coaching_compliance) VALUES (?, ?, ?, ?, ?, ?, datetime(), 0)", [survey, 0, channelId, pdvId, sellerId, userId])
                .then(function (result){
                    return true;
                });
        };

        self.getPendingSurvey = function(){
            return Database.query('SELECT id, survey, syncStatus FROM Survey WHERE syncStatus = 0 LIMIT 0,1')
                .then(function (result){
                    if(result.rows.length > 0){
                        return Database.fetch(result);
                    }
                    
                    return undefined;
                });
        };

        self.closeSurvey = function(coachingCompliance){
            return Database.query('UPDATE Survey SET syncStatus = 1, coaching_compliance = ? WHERE syncStatus = 0', [coachingCompliance])
                .then(function (result){
                    return true;
                });
        };

        self.enableAuditMode = function(channelId, pdvId, sellerId, auditId){
            window.localStorage.setItem(auditModeKey, true);
            window.localStorage.setItem(channelKeyId, channelId);
            window.localStorage.setItem(pdvKeyId, pdvId);
            window.localStorage.setItem(sellerKeyId, sellerId);		
            window.localStorage.setItem(lastChannelKeyId, channelId);
            window.localStorage.setItem(lastSellerKeyId, sellerId);
            window.localStorage.setItem(lastPdvKeyId, pdvId);
            window.localStorage.setItem(auditIdKey, auditId);
        };

        self.disableAuditMode = function(){
            window.localStorage.setItem(auditModeKey, false);
            window.localStorage.setItem(channelKeyId, 0);
            window.localStorage.setItem(pdvKeyId, 0);
            window.localStorage.setItem(sellerKeyId, 0);
            window.localStorage.setItem(auditIdKey, 0);
        };

        self.getAuditId = function(){
            if(window.localStorage.getItem(auditIdKey) === undefined){
                window.localStorage.setItem(auditIdKey, 0);
            }

            return window.localStorage.getItem(auditIdKey);         
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
        
        self.getLastAuditChannel = function(){
            return window.localStorage.getItem(lastChannelKeyId);  
        };

        self.getAuditPdv = function(){
            if(window.localStorage.getItem(pdvKeyId) === undefined){
                window.localStorage.setItem(pdvKeyId, 0);
            }

            return window.localStorage.getItem(pdvKeyId);
        };

        self.getLastAuditPdv = function(){
            return window.localStorage.getItem(lastPdvKeyId);  
        };

        self.getAuditSeller = function(){
            if(window.localStorage.getItem(sellerKeyId) === undefined){
                window.localStorage.setItem(sellerKeyId, 0);
            }

            return window.localStorage.getItem(sellerKeyId);
        };
        
        self.getLastAuditSeller = function(){
            return window.localStorage.getItem(lastSellerKeyId);  
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

        self.deleteQuestionAnswer = function(surveyId, id){
            return Database.query('DELETE FROM SurveyQuestionsResults WHERE questionId = ? AND surveyId = ?', [id, surveyId])
                .then(function (result){
                    return true;
                });
        };

        self.setNoBrf = function(surveyId, noBrfResult){
            return Database.query('UPDATE SurveyNoBrfResults SET noBrf = ? WHERE surveyId = ?', [noBrfResult, surveyId])
                .then(function (result){
                    if(result.rowsAffected === 0){
                        return Database.query('INSERT INTO SurveyNoBrfResults(surveyId, noBrf) VALUES(?, ?)', [surveyId, noBrfResult])
                            .then(function (result){
                                return true;
                            });					
                    }

                    return true;
                });
        };

        self.setObservations = function(surveyId, observations){
            return Database.query('UPDATE SurveyObservationResults SET observations = ? WHERE surveyId = ?', [observations, surveyId])
                .then(function (result){
                    if(result.rowsAffected === 0){
                        return Database.query('INSERT INTO SurveyObservationResults(surveyId, observations) VALUES(?, ?)', [surveyId, observations])
                            .then(function (result){
                                return true;
                            });
                    }

                    return true;
                });
        };

        self.getNoBrf = function(surveyId){
            return Database.query('SELECT noBrf FROM SurveyNoBrfResults WHERE surveyId = ?',[surveyId])
                .then(function (result){
                    if(result.rows.length > 0){
                        return Database.fetch(result);					
                    }

                    return undefined;
                });
        };

        self.getObservations = function(surveyId){
            return Database.query('SELECT observations FROM SurveyObservationResults WHERE surveyId = ?', [surveyId])
                .then(function (result){
                    if(result.rows.length > 0){
                        return Database.fetch(result);					
                    }

                    return undefined;
                });		
        };
        
        self.getClosedSurveys = function(){
            return Database.query('SELECT survey, syncStatus, channelId, pdvId, sellerId, userId, id FROM Survey WHERE syncStatus = 1')
                .then(function(result){
                    return Database.fetchAll(result);                                
            }); 
        };
        
        self.getClosedSurveysNoBrf = function(){
            return Database.query('SELECT sur.survey, nobrf.noBrf, sur.userId FROM SurveyNoBrfResults nobrf INNER JOIN Survey sur ON sur.id = nobrf.surveyId WHERE sur.syncStatus = 1')
                .then(function(result){
                    return Database.fetchAll(result);
                });     
        };       

        self.informSurvey = function(survey){            
            var req = {
                method: "POST",
                url: "http://ws.brf-horizonte.com/set/survey/?token=560a100abad225d5afdf4fc6e5334917",
                headers: {
                    "Content-Type": "application/json"
                },
                data: survey
            };
            
            return $http(req);
        };
        
        self.informNoBrfSurvey = function(survey){     
            console.log(survey);      
            var req = {
                method: "POST",
                url: "http://ws.brf-horizonte.com/set/survey/no-brf/?token=560a100abad225d5afdf4fc6e5334917",
                headers: {
                    "Content-Type": "application/json"
                },
                data: survey
            };
            
            return $http(req);             
        };
        
        self.informSurveyQuestions = function(survey){            
            var req = {
                method: "POST",
                url: "http://ws.brf-horizonte.com/set/survey/questions/?token=560a100abad225d5afdf4fc6e5334917",
                headers: {
                    "Content-Type": "application/json"
                },
                data: survey
            };
            
            return $http(req);            
        };

        self.getCoachingSurveyQuestionsCount = function(surveyId){
            var query = 'SELECT q.* FROM Question q ' +
                        'INNER JOIN SurveyQuestionsResults sq ON sq.questionId = q.questionId ' +
                        'WHERE sq.surveyId = ? ' +
                        'AND q.is_coaching = 1';
            
            return Database.query(query, [surveyId])
                .then(function(result){
                    return result.rows.length;
                });  
        };
        
        self.getVisitedCoachingPdvsCount = function(userId){
            return Database.query('SELECT * FROM Survey WHERE userId = ? AND coaching_compliance = 1', [userId])
                .then(function(result){
                    return result.rows.length;
                });
        };

        self.setAuditFinalValues = function(id_audit, id_mod, mod_name, value, icon, mainModuleId){
            console.log('setAuditFinalValues');
            console.log(mainModuleId);
            return Database.query('INSERT INTO AuditFinalValues(id_audit, id_mod, mod_name, final_value, icon, id_mainmod) VALUES (?, ?, ?, ?, ?, ?)', [id_audit, id_mod, mod_name, value, icon, mainModuleId])
                .then(function(){
                    return true;
                });
        };
        
        self.getAuditFinalValues = function(){
           return Database.query('SELECT * from AuditFinalValues')
            .then(function(result){
                return Database.fetchAll(result);    
            });
        };

        self.getAveragePerModule = function(mainModuleId){
            var query = ' SELECT SUM(final_value) / (SELECT COUNT(*) FROM Survey) AS [percent], afv.id_mod, afv.mod_name, afv.icon' + 
                        ' FROM AuditFinalValues afv' + 
                        ' WHERE afv.id_mainmod = ?' +
                        ' GROUP BY afv.id_mod, afv.mod_name';  
            
            return Database.query(query, [mainModuleId])
                .then(function(result){
                    return Database.fetchAll(result);
                });
        };

        return self;
    }
})();