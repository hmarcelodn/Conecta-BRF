(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('ChannelsController', ChannelsController);

    ChannelsController.$inject = ['$scope', '$route', '$routeParams', 'Channel', 'Survey', '$location'];
    function ChannelsController($scope, $route, $routeParams, Channel, Survey, $location) {
        var vm = this;
        vm.channels = [];
        vm.lastChannelId;
        vm.auditId;

        activate();

        function activate() { 
            Channel.getChannels().then(function(channels){

                //Pre-Selected Unique Channel
                if(channels.length === 1){
                    $location.path(
                        '/Audit/' + $routeParams.auditId +
                        '/Channel/' + channels[0].id +
                        '/Pdv'
                    );
                }
                else{
                    vm.channels = channels;                
                    vm.lastChannelId = Survey.getLastAuditChannel() === null ? undefined : Survey.getLastAuditChannel();
                    vm.auditId = $routeParams.auditId;
                }
            });
        }
    }
})();