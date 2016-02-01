brfPhoneGapApp.controller('channelsController', function($scope, $route, $routeParams,channelService){
		
	channelService.getChannels().then(function(channels){
		$scope.channels = channels;
	});

});