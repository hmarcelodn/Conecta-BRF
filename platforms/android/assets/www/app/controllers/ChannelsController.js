(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('ChannelsController', ChannelsController);

    ChannelsController.$inject = ['$scope', '$route', '$routeParams', 'Channel', 'Survey'];
    function ChannelsController($scope, $route, $routeParams, Channel, Survey) {
        var vm = this;
        vm.channels = [];
        vm.lastChannelId;

        activate();

        function activate() { 
            Channel.getChannels().then(function(channels){
                vm.channels = channels;                
                vm.lastChannelId = Survey.getLastAuditChannel();
            });
        }
    }
})();