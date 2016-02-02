brfPhoneGapApp.factory('questionService', ['$http', '$q', function($http, $q){
	
	return {
		synchronizeQuestions: function(){
			return $http.get('http://ws.brf-horizonte.com/get/questions/?token=560a100abad225d5afdf4fc6e5334917');
		},
		setQuestion: function(question){
			var deferred = $q.defer();

			db.transaction(function(tx){
				return tx.executeSql('INSERT INTO Question(questionId, categoryId, render, answer, title, data, helper, big, thumb, questionModuleId, config, styling) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
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
						question.styling
					], 
					function(tx, res){
						deferred.resolve();
						return true;
				});
			});

			return deferred.promise;	
		},
		setQuestionPdv: function(questionId, pdvId){
			var deferred = $q.defer();

			db.transaction(function(tx){
				return tx.executeSql('INSERT INTO QuestionPdv(questionId, pdvId) VALUES(?, ?)', [questionId, pdvId], function(tx, res){
					deferred.resolve();
					return true;
				});
			});

			return deferred.promise;	
		},		
		getQuestions: function(moduleId, surveyId, categoryId, categoryType){
			var deferred = $q.defer(), result = [];
			var query;			

			if(categoryType === 0){
				query = 'SELECT q.questionId, q.render, q.answer, q.title, q.data, q.helper, q.config, q.styling, res.JSONData FROM Question q' +
						' LEFT JOIN SurveyQuestionsResults res ON res.questionId = q.questionId AND res.surveyId = ?' +
						' INNER JOIN Module mod ON mod.moduleId = q.questionModuleId' +
						' WHERE q.questionModuleId = ?';
			}
			else{
				query = 'SELECT q.questionId, q.render, q.answer, q.title, q.data, q.helper, q.config, q.styling, res.JSONData FROM Question q' +
						' LEFT JOIN SurveyQuestionsResults res ON res.questionId = q.questionId AND res.surveyId = ?' +
						' INNER JOIN Module mod ON mod.moduleId = q.questionModuleId' +
						' INNER JOIN Category cat ON cat.categoryId = q.categoryId' +
						' AND cat.type = mod.categoryType' +
						' WHERE q.questionModuleId = ?';
			}

			if(categoryId !== undefined && categoryId !== null && categoryId != 0){
				query = query + ' AND q.categoryId = ' + categoryId;
			}

			console.log(query);
			console.log(moduleId);
			console.log(surveyId);

			db.transaction(function(tx){
				tx.executeSql(query, [surveyId, moduleId], function(tx, res){

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

	                    result.push(
	                    	{ 
	                    		id: res.rows.item(i).questionId, 
	                    		render: res.rows.item(i).render,
	                    		answer: res.rows.item(i).answer,
	                    		title: res.rows.item(i).title,
	                    		data: res.rows.item(i).data,
	                    		helper: res.rows.item(i).helper,
	                    		config: renderJSONConfig(res.rows.item(i).JSONData, res.rows.item(i).answer, JSON.parse(res.rows.item(i).config)),
	                    		styling: JSON.parse(res.rows.item(i).styling),
	                    		JSONData: renderJSONData(res.rows.item(i).JSONData, res.rows.item(i).answer)
	                    	}
	                    );
	                }	                

	                deferred.resolve(result);
				});
			}, function(a){
				console.log(a);
			});

			return deferred.promise;			
		},
		recreateSchema: function(){
			var deferred = $q.defer();

			db.transaction(function(tx){
				tx.executeSql('DROP TABLE IF EXISTS Question', [], function(tx, res){
					tx.executeSql('DROP TABLE IF EXISTS QuestionPdv', [], function(tx, res){
						tx.executeSql('CREATE TABLE IF NOT EXISTS QuestionPdv(id integer primary key, questionId integer, pdvId integer)', [], function(){
							tx.executeSql('CREATE TABLE IF NOT EXISTS Question(id integer primary key, questionId integer, categoryId integer, render text, answer text, title text, data text, helper text, big text, thumb text, questionModuleId integer, config text, styling text)', [], function(){
								deferred.resolve();
							});	
						});
					});				
				});
			});

			return deferred.promise;
		}
	};	

}]);