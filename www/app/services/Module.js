(function() {
    'use strict';

    angular
        .module('brfPhoneGapApp')
        .factory('Module', Module);

    Module.$inject = ['$http', 'Database', 'Login'];

    function Module($http, Database, Login) {
        var self = this;

        self.synchronizeModules = function() {
            //return $http.get('https://ws.qa.conecta-brf.com/get/modules/?token=560a100abad225d5afdf4fc6e5334917&id_user=' + Login.getToken().id);
            return $http.get('https://ws.conecta-brf.com/get/modules/?token=560a100abad225d5afdf4fc6e5334917&id_user=' + Login.getToken().id);
        };

        self.synchronizeMainModules = function() {
            // return $http.get('https://ws.qa.conecta-brf.com/get/modules/main/?token=560a100abad225d5afdf4fc6e5334917');
            return $http.get('https://ws.conecta-brf.com/get/modules/main/?token=560a100abad225d5afdf4fc6e5334917');
        };

        self.setMainModule = function(id, modName, icon, mapLabel, hasDashboard) {
            Database.query('INSERT INTO MainModule(id, mod_name, icon, map_label, has_dashboard) VALUES (?, ?, ?, ?, ?)', [id, modName, icon, mapLabel, hasDashboard])
                .then(function(result) {
                    return true;
                });
        };

        self.setModule = function(moduleId, behavior, modName, categoryType, color, icon, slug, mainModuleId, Bind, Ordering) {
            Database.query('INSERT INTO Module(moduleId, behavior, modName, categoryType, color, icon, slug, idMainMod, Bind, Ordering) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [moduleId, behavior, modName, categoryType, color, icon, slug, mainModuleId, Bind, Ordering])
                .then(function(result) {
                    return true;
                });
        };

        self.setModuleChannels = function(moduleId, channelId) {
            Database.query('INSERT INTO ModuleChannels(moduleId, channelId) VALUES(?, ?)', [moduleId, channelId])
                .then(function(result) {
                    return true;
                });
        };

        self.setModuleRoles = function(moduleId, roleId) {
            Database.query('INSERT INTO ModuleUserRoles(moduleId, roleId) VALUES(?, ?)', [moduleId, roleId])
                .then(function(result) {
                    return true;
                });
        };

        self.setModuleBind = function(moduleId, moduleBind) {
            Database.query('INSERT INTO ModuleBind(moduleId, moduleBinded) VALUES(?, ?)', [moduleId, moduleBind])
                .then(function(result) {
                    return true;
                });
        };

        self.getModuleByName = function(moduleName) {
            return Database.query('SELECT id, moduleId, behavior, modName, categoryType, color, icon FROM Module WHERE modName = ?', [moduleName])
                .then(function(result) {
                    return Database.fetch(result);
                });
        };

        self.getModuleBySlug = function(slug) {
            return Database.query('SELECT id, moduleId, behavior, modName, categoryType, color, icon, slug FROM Module WHERE slug = ?', [slug])
                .then(function(result) {
                    return Database.fetch(result);
                });
        };

        self.getModules = function(channelId, roleId, auditId, pdvId) {
            var query = 'SELECT DISTINCT mod.id, mod.moduleId, mod.behavior, mod.modName, mod.categoryType, mod.color, mod.icon, mod.slug, ifnull(hq.haveQuestions, 0) as haveQuestions ' +
                ' FROM Module mod' +
                ' INNER JOIN ModuleChannels modcha ON modcha.moduleId = mod.moduleId' +
                ' INNER JOIN ModuleUserRoles modur ON modur.moduleId = mod.moduleId' +
                //' INNER JOIN (Select Count(1) as cDashboard, questionModuleId qModId FROM Question q WHERE q.is_Dashboard = 1 Group By questionModuleId) dashC ON mod.id = dashC.qModId' +
                ' LEFT JOIN (SELECT Count(sqr.id) as haveQuestions, q.QuestionModuleId ' +
                ' FROM Survey S INNER JOIN SurveyQuestionsResults sqr ON S.id = sqr.SurveyId INNER JOIN Question q ON sqr.QuestionId = q.QuestionId ' + 
                ' WHERE S.Channelid =' + channelId + ' AND S.pdvId =' + pdvId +
                ' GROUP BY q.QuestionModuleId) hQ ON mod.ModuleId = hQ.QuestionModuleId ' +
                //' LEFT JOIN (SELECT Count(sqr.id) as haveQuestions, q.QuestionModuleId FROM SurveyQuestionsResults sqr INNER JOIN Question q ON sqr.QuestionId = q.QuestionId WHERE sqr.surveyId = ' + auditId +' GROUP BY 	q.QuestionModuleId) hQ ON mod.ModuleId = hQ.QuestionModuleId ' +
                ' WHERE modcha.channelId = ?' +
                ' AND modur.roleId = ?' +
                ' AND mod.idMainMod = ?' + 
                ' ORDER BY mod.Ordering ASC, mod.ModuleId ASC ';

            /* console.log('ModQry');
            console.log (query);
            console.log ("channelId");
            console.log (channelId);
            console.log ("roleId");
            console.log (roleId);
            console.log ("auditId");
            console.log (auditId);
            console.log ("pdvId");
            console.log (pdvId);
            console.log("//END");
*/

            return Database.query(query, [channelId, roleId, auditId])
                .then(function(result) {
                    return Database.fetchAll(result);
                });
        };

        self.getDefaultModules = function(channelId, roleId) {
            var query = 'SELECT DISTINCT mod.id, mod.moduleId, mod.behavior, mod.modName, mod.categoryType, mod.color, mod.icon, mod.slug FROM Module mod' +
                ' INNER JOIN ModuleChannels modcha ON modcha.moduleId = mod.moduleId' +
                ' INNER JOIN ModuleUserRoles modur ON modur.moduleId = mod.moduleId' +
                ' WHERE modcha.channelId = ?' +
                ' AND modur.roleId = ? LIMIT 0,1';

            return Database.query(query, [channelId, roleId])
                .then(function(result) {
                    return Database.fetch(result);
                });
        };

        self.getModuleById = function(moduleId) {
            return Database.query('SELECT * FROM Module WHERE moduleId = ? ORDER BY Ordering ASC, ModuleId ASC ', [moduleId])
                .then(function(result) {
                    return Database.fetch(result);
                });
        };

        self.getMainModules = function() {
            return Database.query('SELECT * FROM MainModule')
                .then(function(result) {
                    return Database.fetchAll(result);
                });
        };

        return self;
    }
})();