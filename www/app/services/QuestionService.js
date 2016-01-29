brfPhoneGapApp.factory('questionService', ['$http', '$q', function($http, $q){
	
	return {
		synchronizeQuestions: function(){
			return $http.get('http://ws.brf-horizonte.com/get/questions/?token=560a100abad225d5afdf4fc6e5334917');
		},
		setQuestion: function(questionId, categoryId, pdvFilter, render, answer, title, data, helper, big, thumb, questionModuleId){
			var deferred = $q.defer();

			db.transaction(function(tx){
				return tx.executeSql('INSERT INTO Question(questionId, categoryId, pdvFilter, render, answer, title, data, helper, big, thumb, questionModuleId) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [questionId, categoryId, pdvFilter, render, answer, title, data, helper, big, thumb, questionModuleId], function(tx, res){
					deferred.resolve();
					return true;
				});
			});

			return deferred.promise;	
		},
		getCoachingQuestions: function(){
			var deferred = $q.defer(), result = [];

			db.transaction(function(tx){
				tx.executeSql('SELECT questionId, render, answer, title, data, helper FROM Question', [], function(tx, res){

	               for(var i = 0; i < res.rows.length; i++){
	                    result.push(
	                    	{ 
	                    		id: res.rows.item(i).questionId, 
	                    		render: res.rows.item(i).render,
	                    		answer: res.rows.item(i).answer,
	                    		title: res.rows.item(i).title,
	                    		data: res.rows.item(i).data,
	                    		helper: res.rows.item(i).helper
	                    	}
	                    );
	                }
	                
	                deferred.resolve(result);
				});
			});

			return deferred.promise;			
		},
		recreateSchema: function(){
			var deferred = $q.defer();

			db.transaction(function(tx){
				tx.executeSql('DROP TABLE IF EXISTS Question', [], function(tx, res){
					tx.executeSql('CREATE TABLE IF NOT EXISTS Question(id integer primary key, questionId integer, categoryId integer, pdvFilter integer, render text, answer text, title text, data text, helper text, big text, thumb text, questionModuleId)', [], function(){
						deferred.resolve();
					});					
				});
			});

			return deferred.promise;
		}
	};	

}]);