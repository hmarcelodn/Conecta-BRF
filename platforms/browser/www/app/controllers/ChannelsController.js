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
        vm.auditId;

        activate();

        function activate() { 
            Channel.getChannels().then(function(channels){
                vm.channels = channels;                
                vm.lastChannelId = Survey.getLastAuditChannel() === null ? undefined : Survey.getLastAuditChannel();
                vm.auditId = $routeParams.auditId;
            });
        }
    }
})();