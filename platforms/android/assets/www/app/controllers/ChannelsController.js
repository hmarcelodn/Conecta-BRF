brfPhoneGapApp.controller('channelsController', ['$scope', '$route', '$routeParams', 'Channel', function($scope, $route, $routeParams, Channel){
		
	Channel.getChannels().then(function(channels){
		$scope.channels = channels;
	});

}]);