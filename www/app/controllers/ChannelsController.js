brfPhoneGapApp.controller('channelsController', function($scope, $route, channelService){
		
	channelService.getChannels().then(function(channels){
		$scope.channels = channels;
	});

});