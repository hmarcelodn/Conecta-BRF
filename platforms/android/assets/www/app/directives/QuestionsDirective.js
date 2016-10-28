brfPhoneGapApp.directive('questions', function(){
	return{
		restrict: 'E',		
		scope: {
			content: '='
		},
		templateUrl: 'app/partials/questions.html',
		replace: true
	}
});