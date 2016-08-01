(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .factory('Question', Question);

    Question.$inject = ['$http', 'Database'];
    function Question($http, Database) {
        var self = this;

        self.synchronizeQuestions = function () {
            return $http.get('https://ws.conecta-brf.com/get/questions/?token=560a100abad225d5afdf4fc6e5334917');
            //return $http.get('https://ws.qa.conecta-brf.com/get/questions/?token=560a100abad225d5afdf4fc6e5334917');
        };

        self.setQuestion = function (question){
            return Database.query('INSERT INTO Question(questionId, categoryId, render, answer, title, data, helper, big, thumb, questionModuleId, config, styling, is_mandatory, has_percent, is_dashboard, weight, is_coaching, id_group) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
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
                            question.is_coaching,
                            question.id_group
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

        self.synchronizeQuestionsGroups = function () {
            return $http.get('https://ws.conecta-brf.com/get/questions/groups/?token=560a100abad225d5afdf4fc6e5334917');
        };

        self.setQuestionGroups = function (questionGroupId, Type, Name, TargetMin, TargetMax){
            return Database.query('INSERT INTO QuestionGroups(questionGroupId, Type, Name, TargetMin, TargetMax) VALUES(?, ?, ?, ?, ?)', 
                        [
                            questionGroupId, 
                            Type,
                            Name, 
                            TargetMin,
                            TargetMax
                        ])
            .then(function (result){
                return true;
            });
        };


        self.getQuestions = function(moduleId, surveyId, categoryId, categoryType, PdvId){

            var query;			

            if(categoryType === 0){
                query = 'SELECT q.questionId, q.render, q.answer, q.title, q.data, q.helper, q.config, q.styling, q.is_mandatory, q.has_percent,' +
                        ' q.is_dashboard, q.weight, q.is_coaching,res.JSONData, q.thumb, q.big, q.id_group, qg.Type as grpType, qg.TargetMin, qg.TargetMax' +
                        //' FROM (Select Distinct QP.questionId FROM QuestionPDV QP, Customer C Where ( (C.customerId =' + PdvId + ' AND QP.PDVId = C.pdvType) OR (QP.PDVId = 0) ) ) QP ' +
                        ' FROM (SELECT Distinct QP.questionId ' + 
                        '        FROM QuestionPDV QP ' + 
                        '        WHERE QP.PDVId = (Select C.pdvType From Customer C Where C.customerId =' + PdvId + ')' +
                        '         OR QP.PDVId = 0) QP ' +
                        ' INNER JOIN Question q ON QP.questionId = q.questionId ' +
                        ' LEFT JOIN SurveyQuestionsResults res ON res.questionId = q.questionId AND res.surveyId = ?' +
                        ' INNER JOIN Module mod ON mod.moduleId = q.questionModuleId' +
                        //' INNER JOIN ModuleBind mod ON mod.moduleBinded = q.questionModuleId' +
                        ' LEFT JOIN QuestionGroups qg ON q.id_group = qg.questionGroupId' +
                        ' WHERE q.questionModuleId = ? '; // +
                        //' AND q.questionId IN (Select Distinct QP.questionId FROM QuestionPDV QP, Customer C Where ( (C.customerId =' + PdvId + ' AND QP.PDVId = C.pdvType) OR (QP.PDVId = 0) ) ) ';
                       
            }
            else{
                query = 'SELECT q.questionId, q.render, q.answer, q.title, q.data, q.helper, q.config, q.styling, q.is_mandatory, q.has_percent,' +
                        ' q.is_dashboard, q.weight, q.is_coaching,res.JSONData, q.thumb, q.big, q.id_group, qg.Type as grpType, qg.TargetMin, qg.TargetMax' +
                        //' FROM (Select Distinct QP.questionId FROM QuestionPDV QP, Customer C Where ( (C.customerId =' + PdvId + ' AND QP.PDVId = C.pdvType) OR (QP.PDVId = 0) ) ) QP ' +
                        ' FROM (SELECT Distinct QP.questionId ' + 
                        '        FROM QuestionPDV QP ' + 
                        '        WHERE QP.PDVId = (Select C.pdvType From Customer C Where C.customerId =' + PdvId + ')' +
                        '         OR QP.PDVId = 0) QP ' +
                        ' INNER JOIN Question q ON QP.questionId = q.questionId ' +
                        ' LEFT JOIN SurveyQuestionsResults res ON res.questionId = q.questionId AND res.surveyId = ?' +
                        ' INNER JOIN Module mod ON mod.moduleId = q.questionModuleId' +
                        ' INNER JOIN Category cat ON cat.categoryId = q.categoryId' +
                        ' AND cat.type = mod.categoryType' +
                        ' LEFT JOIN QuestionGroups qg ON q.id_group = qg.questionGroupId' +
                        ' WHERE q.questionModuleId = ? ';
            }
            
            if(categoryId !== undefined && categoryId !== null && categoryId != 0){
                query = query + ' AND q.categoryId = ' + categoryId;
            }		
//LUU
 console.log ("A");
console.log (query);
console.log ("moduleId");
console.log (moduleId);
console.log ("surveyId");
console.log (surveyId);
console.log ("PdvId");
console.log (PdvId);

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
                                    case 'binary_strict':
                                        result = {};
                                        break;
                                    case 'open':
                                        result = { value: '' };
                                        break;
                                    case 'planogram':
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
// LUU
//console.log ("res.rows.length");
//console.log (res.rows.length);
//console.log ("//res.rows");

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
                                                            res.rows.item(i).answer),
                                    big: res.rows.item(i).big,
                                    thumb: res.rows.item(i).thumb,
                                    id_group: res.rows.item(i).id_group,
                                    grpType: res.rows.item(i).grpType, 
                                    TargetMin: res.rows.item(i).TargetMin, 
                                    TargetMax: res.rows.item(i).TargetMax
                                }
                            );
                        }

                        return questions;					
                });
        };
        
        self.getQuestionsBySurveyId = function(surveyId){
            return Database.query("SELECT questionId AS [id], JSONData AS [value] FROM SurveyQuestionsResults WHERE surveyId = ? AND JSONData not like ('%neutral%')", [surveyId])
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
        
        //TODO: Revisar.
        self.getBaseWeightPerModule = function(roleId, channelId, surveyId){                    
            
            var query = 'SELECT SUM(q2.weight) [base], q2.questionModuleId AS [moduleId], mod2.modName, mod2.icon' +
                        ' FROM Question q2' +
                        ' INNER JOIN SurveyQuestionsResults res ON res.questionId = q2.questionId' +
                        ' INNER JOIN Module mod2 ON mod2.moduleId = q2.questionModuleId' +
                        ' INNER JOIN MainModule main ON main.id = mod2.idMainMod' +
                        ' WHERE q2.questionId IN (' +
                            ' SELECT q.questionId FROM Question q ' +
                            ' INNER JOIN ModuleChannels modChan ON modChan.moduleId = q.questionModuleId' +
                            ' INNER JOIN ModuleUserRoles modRol ON modRol.moduleId = q.questionModuleId' +
                            ' WHERE modChan.channelId = ?' +  
                            ' AND modRol.roleId = ?' +                      
                        ')' +
                        ' AND q2.questionModuleId IN (SELECT DISTINCT q3.questionModuleId FROM Question q3 INNER JOIN SurveyQuestionsResults surres ON q3.questionId = surres.questionId)' +
                        ' AND main.has_dashboard = 1' +
                        ' AND res.surveyId = ?' +
                        ' GROUP BY q2.questionModuleId';             
            
            return Database.query(query, [channelId, roleId, surveyId])
                .then(function(result){
                    return Database.fetchAll(result);    
                });    
        };
        
        self.getModulePercentageByWeight = function(surveyId, moduleId, weight){                        
            var query = ' SELECT ' +
                        ' ((SELECT SUM(q.weight) FROM Question q ' +
                        '   INNER JOIN SurveyQuestionsResults res ON q.questionId = res.questionId ' +
                        '   AND res.surveyId = ?' +
                        " WHERE res.JSONData LIKE '%true%' AND q.questionModuleId = ?) / ?) * 100 [ModulePercentage]";            
            
            return Database.query(query, [surveyId, moduleId, weight])
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

        self.getAuditedQuestionsResume = function(moduleId, mainModuleId){            
           var query = 'SELECT' + 
                        ' ROUND(AVG(' +
                        ' (' +
                            ' SELECT ROUND(COUNT(*), 2) FROM SurveyQuestionsResults  res1' +
                            " WHERE res1.JSONData LIKE '%true%'" +
                            ' AND res1.questionid = res0.questionId' +
                        ' )' + 
                        ' /' +
                        ' (' +
                            ' SELECT ROUND(COUNT(*), 2)  FROM SurveyQuestionsResults  res1' +
                            ' WHERE res1.questionid = res0.questionId' +
                        ')' + 
                    ') * 100, 2) AS [questionAverage], q.title as title' + 
                    ' FROM SurveyQuestionsResults  res0' +
                    ' INNER JOIN Survey sur ON sur.id = res0.surveyId' +
                    ' INNER JOIN Question q ON q.answer != "planogram" AND q.questionId = res0.questionId' +
                    ' INNER JOIN Module mod ON mod.moduleId = q.questionModuleId' +
                    ' AND q.questionModuleId = ?' +
                    ' AND mod.idMainMod = ?' +
                    ' AND q.is_dashboard = 1' +
                    " AND ( (q.questionModuleId not in (4,17,23,26,37,38)) OR  (q.questionModuleId in (4,17,23,26,37,38) and res0.JSONData LIKE '%false%'))" +
                    ' GROUP BY q.title ' +
                    ' UNION ALL ' + 
                    ' SELECT Distinct Plan.PercentageGroup as [questionAverage], Plan.name as title' +
					' FROM SurveyQuestionsResults  res0' +
					' INNER JOIN Survey sur ON sur.id = res0.surveyId' +
                    ' INNER JOIN Question q ON q.answer = "planogram" AND q.questionId = res0.questionId' +
					' INNER JOIN (SELECT Distinct ' +
					'				Grupo.categoryId, Grupo.name, ' +
					'				CASE ' +
					"					WHEN ((((Grupo.sCant_Group * 100) / Total.sCant_Total) >= Grupo.TargetMin) AND ((Grupo.sCant_Group * 100) / Total.sCant_Total) <= Grupo.TargetMax) THEN '100' " +
					"					ELSE '0' " +
					'				END as PercentageGroup ' +
					'			  FROM ' +
					'				(SELECT ' +
					"					SUM(replace(replace(res1.JSONData, '" +
                    '{"value":' +
                    "', ''), '}', '')) as sCant_Group, q1.categoryId, qg.Name, qg.TargetMin, qg.TargetMax " +
					'				FROM SurveyQuestionsResults  res1 INNER JOIN Question q1 ON res1.questionid = q1.questionid ' +
					"					AND q1.answer = 'planogram' " +
					'					INNER JOIN QuestionGroups qg ON q1.id_group = qg.questionGroupId ' +
					'					AND qg.type = 1 ' +
					'				GROUP BY ' +
					'					q1.categoryId, qg.name, qg.TargetMin, qg.TargetMax) Grupo ' +
					'				INNER JOIN (SELECT ' +
					"					SUM(replace(replace(res1.JSONData, '" +
                    '{"value":' +
                    "', ''), '}', '')) as sCant_Total, q1.categoryId " +
					'				FROM SurveyQuestionsResults  res1 INNER JOIN Question q1 ON res1.questionid = q1.questionid ' +
					"					 AND q1.answer = 'planogram' " +
					'				GROUP BY q1.CategoryId ) Total ' +
					'				ON Grupo.categoryId = Total.categoryId ) Plan ON q.categoryId = Plan.categoryId ' +
                    ' INNER JOIN Module mod ON mod.moduleId = q.questionModuleId' +
                    ' AND q.questionModuleId = ?' +
                    ' AND mod.idMainMod = ?' +
                    ' AND q.is_dashboard = 1 ';// +
                    //" AND ( (q.questionModuleId not in (4,17,23,26,37,38)) OR  (q.questionModuleId in (4,17,23,26,37,38) and res0.JSONData LIKE '%false%'))" +
                    //' GROUP BY q.title';

                    //LUU
                    //console.log ("query getAuditedQuestionsResume");
                    //console.log (query);
                    //console.log (moduleId);
                    //console.log (mainModuleId);                          

           return Database.query(query, [moduleId, mainModuleId, moduleId, mainModuleId])
            .then(function(result){
                return Database.fetchAll(result);
            });
        };
        
        self.getQuestionById = function(questionId){
            return Database.query('SELECT * FROM Question q WHERE q.questionId = ?', [questionId])
                .then(function(question){
                    return Database.fetch(question);
                });
        };               

        self.getMandatoryQuestions = function(surveyId, roleId, channelId, auditId, PdvId){        
            return Database.query('SELECT q.*, mod.slug' +
                                  ' FROM  (SELECT Distinct QP.questionId ' + 
                                  '        FROM QuestionPDV QP ' + 
                                  '        WHERE QP.PDVId = (Select C.pdvType From Customer C Where C.customerId =' + PdvId + ')' +
                                  '         OR QP.PDVId = 0) QP ' +
                                  ' INNER JOIN Question q ON QP.questionId = q.questionId ' +
                                  ' INNER JOIN Module mod ON mod.moduleId = q.questionModuleId' +
                                  ' INNER JOIN ModuleUserRoles modUs ON q.questionModuleId = modUs.moduleId' +
                                  ' INNER JOIN ModuleChannels modCh ON modCh.moduleId = modUs.moduleId' +
                                  ' LEFT JOIN SurveyQuestionsResults qRes ON qRes.questionId = q.questionId' +
                                  '  AND qRes.surveyId = ?' +
                                  '  WHERE q.is_mandatory = 2' +
                                  '  AND modUs.roleId = ?' +
                                  '  AND modCh.channelId = ?' +
                                  ' AND qRes.questionId IS NULL' + 
                                  ' AND mod.idMainMod = ? ', [surveyId, roleId, channelId, auditId])
                                  //' AND q.questionId IN (Select QP.questionId FROM QuestionPDV QP, Customer C Where ( (C.customerId =' + PdvId + ' AND QP.PDVId = C.pdvType) OR (QP.PDVId = 0) ) ) ', [surveyId, roleId, channelId, auditId])
                .then(function(questions){
                    return Database.fetchAll(questions);    
                });       
        };
        
        self.getSuggestedQuestions = function(surveyId, roleId, channelId, auditId, PdvId){
            return Database.query('SELECT q.*, mod.slug ' +
                                  ' FROM (SELECT Distinct QP.questionId ' + 
                                  '        FROM QuestionPDV QP ' + 
                                  '        WHERE QP.PDVId = (Select C.pdvType From Customer C Where C.customerId =' + PdvId + ')' +
                                  '         OR QP.PDVId = 0) QP ' +
                                  ' INNER JOIN Question q ON QP.questionId = q.questionId ' +
                                  ' INNER JOIN Module mod ON mod.moduleId = q.questionModuleId' +
                                  ' INNER JOIN ModuleUserRoles modUs ON q.questionModuleId = modUs.moduleId' +
                                  ' INNER JOIN ModuleChannels modCh ON modCh.moduleId = modUs.moduleId' +
                                  ' LEFT JOIN SurveyQuestionsResults qRes ON qRes.questionId = q.questionId' +
                                  '  AND qRes.surveyId = ?' +
                                  '  WHERE q.is_mandatory = 1' +
                                  '  AND modUs.roleId = ?' +
                                  '  AND modCh.channelId = ?' +
                                  ' AND qRes.questionId IS NULL' +
                                  ' AND mod.idMainMod = ? ', [surveyId, roleId, channelId, auditId])
                                  //' AND q.questionId IN (Select QP.questionId FROM QuestionPDV QP, Customer C Where ( (C.customerId =' + PdvId + ' AND QP.PDVId = C.pdvType) OR (QP.PDVId = 0) ) ) ', [surveyId, roleId, channelId, auditId])
                .then(function(questions){
                    return Database.fetchAll(questions);    
                });               
        };

        return self;
    }
})();