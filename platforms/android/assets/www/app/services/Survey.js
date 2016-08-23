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

    Survey.$inject = ['$http', 'Database', 'Question', '$location', '$rootScope', '$q'];

    function Survey($http, Database, Question, $location, $rootScope, $q) {
        var self = this;
        var leftCoaching = $rootScope.leftCoaching;

        self.setSurvey = function(survey, channelId, pdvId, sellerId, userId) {
            console.log('setSurvey');
            return Database.query("INSERT INTO Survey(survey, syncStatus, channelId, pdvId, sellerId, userId, date, coaching_compliance) VALUES (?, ?, ?, ?, ?, ?, datetime(), 0)", [survey, 0, channelId, pdvId, sellerId, userId])
                .then(function(result) {
                    return true;
                });
        };

        self.getPendingSurvey = function() {
            return Database.query('SELECT id, survey, syncStatus FROM Survey WHERE syncStatus = 0 LIMIT 0,1')
                .then(function(result) {
                    if (result.rows.length > 0) {
                        return Database.fetch(result);
                    }

                    return undefined;
                });
        };

        self.updateSurveyStatus = function(coachingCompliance) {
            return Database.query('UPDATE Survey SET syncStatus = 1, coaching_compliance = ? WHERE syncStatus = 0', [coachingCompliance])
                .then(function() {
                    return true;
                });
        };

        self.enableAuditMode = function(channelId, pdvId, sellerId, auditId) {
            window.localStorage.setItem(auditModeKey, true);
            window.localStorage.setItem(channelKeyId, channelId);
            window.localStorage.setItem(pdvKeyId, pdvId);
            window.localStorage.setItem(sellerKeyId, sellerId);
            window.localStorage.setItem(lastChannelKeyId, channelId);
            window.localStorage.setItem(lastSellerKeyId, sellerId);
            window.localStorage.setItem(lastPdvKeyId, pdvId);
            window.localStorage.setItem(auditIdKey, auditId);
            //ACA AGREGAR QUE GUARDE EL SURVEYID
            //LUUUU
        };

        self.disableAuditMode = function() {
            window.localStorage.setItem(auditModeKey, false);
            window.localStorage.setItem(channelKeyId, 0);
            window.localStorage.setItem(pdvKeyId, 0);
            window.localStorage.setItem(sellerKeyId, 0);
            window.localStorage.setItem(auditIdKey, 0);
        };

        self.getAuditId = function() {
            if (window.localStorage.getItem(auditIdKey) === undefined) {
                window.localStorage.setItem(auditIdKey, 0);
            }

            return window.localStorage.getItem(auditIdKey);
        };

        self.getAuditMode = function() {
            if (window.localStorage.getItem(auditModeKey) === undefined) {
                window.localStorage.setItem(auditModeKey, false);
            }

            return (window.localStorage.getItem(auditModeKey) === 'true');
        };

        self.getAuditChannel = function() {
            if (window.localStorage.getItem(channelKeyId) === undefined) {
                window.localStorage.setItem(channelKeyId, 0);
            }

            return window.localStorage.getItem(channelKeyId);
        };

        self.getLastAuditChannel = function() {
            return window.localStorage.getItem(lastChannelKeyId);
        };

        self.getAuditPdv = function() {
            if (window.localStorage.getItem(pdvKeyId) === undefined) {
                window.localStorage.setItem(pdvKeyId, 0);
            }

            return window.localStorage.getItem(pdvKeyId);
        };

        self.getLastAuditPdv = function() {
            return window.localStorage.getItem(lastPdvKeyId);
        };

        self.getAuditSeller = function() {
            if (window.localStorage.getItem(sellerKeyId) === undefined) {
                window.localStorage.setItem(sellerKeyId, 0);
            }

            return window.localStorage.getItem(sellerKeyId);
        };

        self.getLastAuditSeller = function() {
            return window.localStorage.getItem(lastSellerKeyId);
        };

        self.setQuestionAnswer = function(surveyId, id, data) {
            return Database.query('UPDATE SurveyQuestionsResults SET JSONData = ? WHERE questionId = ? AND surveyId = ?', [data, id, surveyId])
                .then(function(result) {
                    if (result.rowsAffected === 0) {
                        return Database.query('INSERT INTO SurveyQuestionsResults(surveyId, questionId, JSONData) VALUES (?, ?, ?)', [surveyId, id, data])
                            .then(function(result) {
                                return true;
                            });
                    } else {
                        return true;
                    }
                });
        };

        self.deleteQuestionAnswer = function(surveyId, id) {
            return Database.query('DELETE FROM SurveyQuestionsResults WHERE questionId = ? AND surveyId = ?', [id, surveyId])
                .then(function(result) {
                    return true;
                });
        };

        self.setNoBrf = function(surveyId, noBrfResult) {
            return Database.query('UPDATE SurveyNoBrfResults SET noBrf = ? WHERE surveyId = ?', [noBrfResult, surveyId])
                .then(function(result) {
                    if (result.rowsAffected === 0) {
                        return Database.query('INSERT INTO SurveyNoBrfResults(surveyId, noBrf) VALUES(?, ?)', [surveyId, noBrfResult])
                            .then(function(result) {
                                return true;
                            });
                    }

                    return true;
                });
        };

        self.setObservations = function(surveyId, observations) {
            return Database.query('UPDATE SurveyObservationResults SET observations = ? WHERE surveyId = ?', [observations, surveyId])
                .then(function(result) {
                    if (result.rowsAffected === 0) {
                        return Database.query('INSERT INTO SurveyObservationResults(surveyId, observations) VALUES(?, ?)', [surveyId, observations])
                            .then(function(result) {
                                return true;
                            });
                    }

                    return true;
                });
        };

        self.getNoBrf = function(surveyId) {
            return Database.query('SELECT noBrf FROM SurveyNoBrfResults WHERE surveyId = ?', [surveyId])
                .then(function(result) {
                    if (result.rows.length > 0) {
                        return Database.fetch(result);
                    }

                    return undefined;
                });
        };

        self.getObservations = function(surveyId) {
            return Database.query('SELECT observations FROM SurveyObservationResults WHERE surveyId = ?', [surveyId])
                .then(function(result) {
                    if (result.rows.length > 0) {
                        return Database.fetch(result);
                    }

                    return undefined;
                });
        };

        self.getClosedSurveys = function() {
            var query = 'SELECT survey, syncStatus, channelId, pdvId, sellerId, userId, id FROM Survey WHERE syncStatus = 1';
            if (leftCoaching > 0) {
                query = query + ' AND coaching_compliance <> 1 ';
            }
            return Database.query(query)
                .then(function(result) {
                    return Database.fetchAll(result);
                });
        };

        self.getClosedSurveysNoBrf = function() {
            return Database.query('SELECT sur.survey, nobrf.noBrf, sur.userId FROM SurveyNoBrfResults nobrf INNER JOIN Survey sur ON sur.id = nobrf.surveyId WHERE sur.syncStatus = 1')
                .then(function(result) {
                    return Database.fetchAll(result);
                });
        };

        self.informSurvey = function(survey) {
            var req = {
                method: "POST",
                url: "https://ws.conecta-brf.com/set/survey/?token=560a100abad225d5afdf4fc6e5334917",
                headers: {
                    "Content-Type": "application/json"
                },
                data: survey
            };
            console.log("SEND informSurvey");
            return $http(req);
        };

        self.informNoBrfSurvey = function(survey) {
            console.log(survey);
            var req = {
                method: "POST",
                url: "https://ws.conecta-brf.com/set/survey/no-brf/?token=560a100abad225d5afdf4fc6e5334917",
                headers: {
                    "Content-Type": "application/json"
                },
                data: survey
            };

            return $http(req);
        };

        self.informSurveyQuestions = function(survey) {
            var req = {
                method: "POST",
                url: "https://ws.conecta-brf.com/set/survey/questions/?token=560a100abad225d5afdf4fc6e5334917",
                headers: {
                    "Content-Type": "application/json"
                },
                data: survey
            };
            console.log("INIT Sync");
            console.log(req);
            console.log("END Sync");
            return $http(req);
        };

        self.getCoachingSurveyQuestionsCount = function(surveyId) {
            var query = 'SELECT q.* FROM Question q ' +
                'INNER JOIN SurveyQuestionsResults sq ON sq.questionId = q.questionId ' +
                'WHERE sq.surveyId = ? ' +
                'AND q.is_coaching = 1';

            return Database.query(query, [surveyId])
                .then(function(result) {
                    return result.rows.length;
                });
        };

        self.getVisitedCoachingPdvsCount = function(userId) {
            return Database.query('SELECT * FROM Survey WHERE userId = ? AND coaching_compliance = 1', [userId])
                .then(function(result) {
                    return result.rows.length;
                });
        };

        self.setAuditFinalValues = function(id_audit, id_mod, mod_name, value, icon, mainModuleId) {
            return Database.query('INSERT INTO AuditFinalValues(id_audit, id_mod, mod_name, final_value, icon, id_mainmod) VALUES (?, ?, ?, ?, ?, ?)', [id_audit, id_mod, mod_name, value, icon, mainModuleId])
                .then(function() {
                    return true;
                });
        };

        self.getAuditFinalValues = function() {
            return Database.query('SELECT * from AuditFinalValues')
                .then(function(result) {
                    return Database.fetchAll(result);
                });
        };

        self.getAveragePerModule = function(mainModuleId) {
            //LUU calculo de porcentajes
            var query = 'SELECT Case  WHEN (ifnull(BinStrict.cBinStrict, 0) > 0) THEN 0 ELSE ROUND(AVG(afr.final_value), 2) END as [moduleAverage] , afr.id_mod, mod.modName [moduleName], mod.icon, dashC.cDashboard, ifnull(BinStrict.cBinStrict, 0)' +
                ' FROM AuditFinalValues afr' +
                '   INNER JOIN Module mod ON mod.moduleId = afr.id_mod' +
                '   INNER JOIN (Select Count(1) as cDashboard, questionModuleId qModId' +
                '               FROM Question q INNER JOIN SurveyQuestionsResults res0 on q.questionId = res0.questionId ' +
                '               WHERE q.is_Dashboard = 1' +
                "                   AND ( (q.questionModuleId not in (4,17,23,26,37,38)) OR (q.questionModuleId in (4,17,23,26,37,38) and res0.JSONData LIKE '%false%'))" +
                '               GROUP BY questionModuleId) dashC ON mod.moduleid = dashC.qModId ' +
                '   LEFT JOIN (Select ifnull(Count(1),0) as cBinStrict, questionModuleId qModId' +
                '               FROM Question q INNER JOIN SurveyQuestionsResults res0 on q.questionId = res0.questionId ' +
                '               WHERE q.is_Dashboard = 1' +
                "                     AND q.answer = 'binary_strict' " +
                "                     AND ( (q.questionModuleId not in (4,17,23,26,37,38)) OR (q.questionModuleId in (4,17,23,26,37,38) and res0.JSONData LIKE '%false%'))" +
                '               GROUP BY questionModuleId) BinStrict ON mod.moduleid = BinStrict.qModId ' +
                ' WHERE afr.id_mainmod = ?' +
                ' GROUP BY afr.id_mod' +
                ' HAVING moduleAverage IS NOT NULL';
            //console.log ("moduleAverage");
            //console.log (query);

            return Database.query(query, [mainModuleId])
                .then(function(result) {
                    return Database.fetchAll(result);
                });
        };

        self.closeSurvey = function(roleId, channelId, surveyId, auditId) {

            var closeSurvey = function(coaching_compliance, auditId, is_dashboard) {
                self.updateSurveyStatus(coaching_compliance).then(function() {

                    $rootScope.$emit('closedSurvey');

                    if (is_dashboard) {
                        $location.path('/Dashboard/' + auditId);
                    } else {
                        $location.path('/Main');
                    }
                });
            };

            //Without Pending Questions close current survey                    
            self.disableAuditMode();

            $q.all([
                    Question.getCoachingQuestionsPerUserRolesCount(roleId),
                    self.getCoachingSurveyQuestionsCount(surveyId),
                    Question.getBaseWeightPerModule(roleId, channelId, surveyId)
                ])
                .then(function(data) {
                    var coachingQuestions = data[0];
                    var auditCoachingQuestions = data[1];
                    var baseWeights = data[2];
                    var coaching_compliance = 0;

                    if (coachingQuestions === auditCoachingQuestions) {
                        coaching_compliance = 1;
                    }

                    if (baseWeights.length > 0) {
                        angular.forEach(baseWeights, function(value, key) {

                            var promises = [];

                            Question.getModulePercentageByWeight(surveyId, value.moduleId, value.base)
                                .then(function(modulePercentage) {
                                    promises.push(
                                        self.setAuditFinalValues(
                                            surveyId,
                                            value.moduleId,
                                            value.modName,
                                            modulePercentage.ModulePercentage === null ?
                                            0 : modulePercentage.ModulePercentage,
                                            value.icon,
                                            auditId
                                        )
                                    );
                                });

                            $q.all(promises).then(function() {
                                //Close Survey                                                
                                closeSurvey(coaching_compliance, auditId, true);
                            })
                        });
                    } else {
                        //Close Survey                                                
                        closeSurvey(coaching_compliance, auditId, false);
                    }
                });
        };

        self.getCoachingComplianceSurvey = function() {
            //??? 20160812  cambie el coaching_compliance = 1 para poder evaluar todos los surveys
            return Database.query('SELECT * FROM Survey WHERE id = 1 ')
                //return Database.query('SELECT * FROM Survey')
                .then(function(result) {
                    return Database.fetchAll(result);
                })
        };

        self.deleteSurveyNoBrfResults = function(auditId) {
            return Database.query('DELETE FROM SurveyNoBrfResults WHERE surveyId = ?', [auditId])
                .then(function(result) {
                    return true;
                });
        };

        self.deleteSurveyObservationResults = function(auditId) {
            return Database.query('DELETE FROM SurveyObservationResults WHERE surveyId = ?', [auditId])
                .then(function(result) {
                    return true;
                });
        };

        self.deleteSurveyQuestionsResults = function(auditId) {
            return Database.query('DELETE FROM SurveyQuestionsResults WHERE surveyId = ?', [auditId])
                .then(function(result) {
                    return true;
                });
        };

        self.deleteSurvey = function(auditId) {
            return Database.query('DELETE FROM Survey WHERE id = ?', [auditId])
                .then(function(result) {
                    return true;
                });
        };

        return self;
    }
})();