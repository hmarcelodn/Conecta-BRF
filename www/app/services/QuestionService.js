brfPhoneGapApp.factory('questionService', ['$http', '$q', function($http, $q){
	
	return {
		synchronizeQuestions: function(){
			return $http.get('http://ws.brf-horizonte.com/get/questions/?token=560a100abad225d5afdf4fc6e5334917');
		},
		setQuestion: function(questionId, categoryId, pdvFilter, render, answer, title, data, helper, big, thumb){
			var deferred = $q.defer();

			db.transaction(function(tx){
				return tx.executeSql('INSERT INTO Question(questionId, categoryId, pdvFilter, render, answer, title, data, helper, big, thumb) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [questionId, categoryId, pdvFilter, render, answer, title, data, helper, big, thumb], function(tx, res){
					deferred.resolve();
					return true;
				});
			});

			return deferred.promise;	
		}
	};	

}]);