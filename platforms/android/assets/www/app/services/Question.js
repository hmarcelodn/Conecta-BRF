(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .factory('Question', Question);

    Question.$inject = ['$http', 'Database'];
    function Question($http, Database) {
        var self = this;

        self.synchronizeQuestions = function () {
            return $http.get('http://ws.brf-horizonte.com/get/questions/?token=560a100abad225d5afdf4fc6e5334917');
        };

        self.setQuestion = function (question){
            return Database.query('INSERT INTO Question(questionId, categoryId, render, answer, title, data, helper, big, thumb, questionModuleId, config, styling, is_mandatory, has_percent, is_dashboard, weight, is_coaching) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                        [
                            question.questionId, 
                            question.categoryId, 
                            question.render, 
                            question.answer, 
                            question.title, 
                            question.data, 
                            question.helper, 
                            question.big, 
                            question.thumb, 
                            question.questionModuleId,
                            question.config,
                            question.styling,
                            question.is_mandatory,
                            question.has_percent,
                            question.is_dashboard,
                            question.weight,
                            question.is_coaching
                        ])
            .then(function (result){
                return true;
            });
        };

        self.setQuestionPdv = function(questionId, pdvId){
            return Database.query('INSERT INTO QuestionPdv(questionId, pdvId) VALUES(?, ?)', [questionId, pdvId])
                .then(function (result){
                    return true;
                });
        };

        self.getQuestions = function(moduleId, surveyId, categoryId, categoryType){

            var query;			

            if(categoryType === 0){
                query = 'SELECT q.questionId, q.render, q.answer, q.title, q.data, q.helper, q.config, q.styling, q.is_mandatory, q.has_percent, q.is_dashboard, q.weight, q.is_coaching,res.JSONData FROM Question q' +
                        ' LEFT JOIN SurveyQuestionsResults res ON res.questionId = q.questionId AND res.surveyId = ?' +
                        ' INNER JOIN Module mod ON mod.moduleId = q.questionModuleId' +
                        ' WHERE q.questionModuleId = ?';
            }
            else{
                query = 'SELECT q.questionId, q.render, q.answer, q.title, q.data, q.helper, q.config, q.styling, q.is_mandatory, q.has_percent, q.is_dashboard, q.weight, q.is_coaching,res.JSONData FROM Question q' +
                        ' LEFT JOIN SurveyQuestionsResults res ON res.questionId = q.questionId AND res.surveyId = ?' +
                        ' INNER JOIN Module mod ON mod.moduleId = q.questionModuleId' +
                        ' INNER JOIN Category cat ON cat.categoryId = q.categoryId' +
                        ' AND cat.type = mod.categoryType' +
                        ' WHERE q.questionModuleId = ?';
            }

            if(categoryId !== undefined && categoryId !== null && categoryId != 0){
                query = query + ' AND q.categoryId = ' + categoryId;
            }		

            return Database.query(query, [surveyId, moduleId])
                .then(function (res){		

                        var questions = [];

                        var renderJSONData = function(JSONData, answerType){

                            var result;

                            if(JSONData === null){
                                switch(answerType)
                                {
                                    case 'binary':
                                        result = {};
                                        break;
                                    case 'open':
                                        result = { value: '' };
                                        break;
                                    case 'price':
                                        result = { value: '' };
                                        break;
                                    case 'multiple':
                                        result = [];
                                        break;
                                }
                            }
                            else{
                                if(answerType !== 'multiple'){
                                    result = JSON.parse(JSONData);
                                }
                            }									

                            return result;
                        };

                        var renderJSONConfig = function(JSONData, answerType, config){
                            if(JSONData === null){
                                return config;
                            }

                            if(answerType !== 'multiple'){
                                return config;
                            }
                            
                            config.answer_config.selected = JSON.parse(JSONData);

                            return config;
                        };

                    for(var i = 0; i < res.rows.length; i++){
                            questions.push(
                                { 
                                    id: res.rows.item(i).questionId, 
                                    render: res.rows.item(i).render,
                                    answer: res.rows.item(i).answer,
                                    title: res.rows.item(i).title,
                                    data: res.rows.item(i).data,
                                    helper: res.rows.item(i).helper,
                                    config: renderJSONConfig(
                                                res.rows.item(i).JSONData, 
                                                res.rows.item(i).answer, JSON.parse(res.rows.item(i).config)
                                    ),
                                    styling: JSON.parse(res.rows.item(i).styling),
                                    is_mandatory: res.rows.item(i).helper,   
                                    has_percent: res.rows.item(i).has_percent,
                                    is_dashboard: res.rows.item(i).is_dashboard,
                                    weight: res.rows.item(i).weight,              
                                    is_coaching: res.rows.item(i).is_coaching,                   
                                    JSONData: renderJSONData(res.rows.item(i).JSONData, 
                                                            res.rows.item(i).answer)
                                }
                            );
                        }

                        return questions;					
                });
        };
        
        self.getQuestionsBySurveyId = function(surveyId){
            return Database.query('SELECT questionId AS [id], JSONData AS [value] FROM SurveyQuestionsResults WHERE surveyId = ?', [surveyId])
                .then(function(result){
                    var questions = Database.fetchAll(result);
                    var questionsResult = new Array();
                    
                    angular.forEach(questions, function(value, key){
                       questionsResult.push(
                           {
                               id: value.id,
                               value: JSON.parse(value.value)
                           }
                       ); 
                    });
                    
                    return questionsResult;
                });
        };
        
        self.getCoachingQuestionsPerUserRolesCount = function(roleId){
            var query = '  SELECT DISTINCT q.questionId FROM Question q' +
                        '  INNER JOIN Module mod ON q.questionModuleId = mod.moduleId' +
                        '  INNER JOIN ModuleUserRoles modRol ON modRol.moduleId = mod.moduleId' +
                        '  WHERE modRol.roleId = ?' +
                        '  AND q.is_coaching = 1';
            
            return Database.query(query, [roleId])
                .then(function(result){
                   return result.rows.length;
                });
        };
        
        self.getCurrentAuditQuestionsWeight = function(surveyId){
            var query = ' SELECT SUM(q.weight) AS [totalWeight] FROM Question q' + 
                        ' INNER JOIN SurveyQuestionsResults sqr ON q.questionId = sqr.questionId' +
                        ' WHERE sqr.surveyId = ?';
            
            return Database.query(query, [surveyId])
                .then(function(result){
                    return Database.fetch(result);    
                });    
        };
        
        self.getCalcultedTotalWeight = function(weightPercent){
            var query = " SELECT mod.icon, mod.modName, mod.moduleId, SUM((q.weight * (100 / ?)) * CASE WHEN sqr.JSONData LIKE '%true%' THEN 1 ELSE 0 END)" + 
                        ' AS [finalValue] FROM Question q' +
                        ' INNER JOIN SurveyQuestionsResults sqr ON q.questionId = sqr.questionId' +
                        ' INNER JOIN Module mod ON q.questionModuleId = mod.moduleId' +
                        ' WHERE q.is_dashboard = 1' +
                        ' GROUP BY mod.icon, mod.modName, mod.moduleId';
            
            return Database.query(query, [weightPercent])
                .then(function(result){
                    return Database.fetchAll(result);    
                });
        };     

        self.getAuditedQuestionsResume = function(moduleId){
           var query = ' SELECT ((SELECT COUNT(*) AS [QuestionsCount] FROM SurveyQuestionsResults sqr INNER JOIN Question q ON sqr.questionId = q.questionId WHERE q.questionModuleId = ?)' + 
                       " / (SELECT COUNT(*) AS [QuestionsCount] FROM SurveyQuestionsResults sqr INNER JOIN Question q ON sqr.questionId = q.questionId WHERE q.questionModuleId = ? AND sqr.JSONData LIKE '%true%')) AS [percentage]" +
                       ' , q.title' +
                       ' FROM Question q' +
                       ' INNER JOIN SurveyQuestionsResults sqr ON q.questionId = sqr.questionId' +
                       ' WHERE q.questionModuleId = ?' +
                       ' GROUP BY q.title'; 
           
           return Database.query(query, [moduleId, moduleId, moduleId])
            .then(function(result){
                return Database.fetchAll(result);
            });
        };

        return self;
    }
})();