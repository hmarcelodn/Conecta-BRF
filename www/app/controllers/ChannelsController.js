(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('ChannelsController', ChannelsController);

    ChannelsController.$inject = ['$scope', '$route', '$routeParams', 'Channel', 'Survey', '$location', 'Login'];
    function ChannelsController($scope, $route, $routeParams, Channel, Survey, $location, Login) {
        var vm = this;
        vm.channels = [];
        vm.lastChannelId;
        vm.auditId;

        activate();

        function activate() { 
            Channel.getChannels(Login.getToken().channels).then(function(channels){

                var allowedChannels = Login.getToken().channels;
                var availableChannels = new Array();

                angular.forEach(channels, function(value, key){
                    if($.inArray(value.id.toString(), allowedChannels) !== -1){
                        availableChannels.push(value);
                    }
                });

                //console.log("Channels!");
                //console.log(channels);

                //Pre-Selected Unique Channel
                if(availableChannels.length === 1){
                    $location.path(
                        '/Audit/' + $routeParams.auditId +
                        '/Channel/' + channels[0].id +
                        '/Pdv'
                    );
                }
                else{
                    vm.channels = availableChannels;                
                    vm.lastChannelId = Survey.getLastAuditChannel() === null ? undefined : Survey.getLastAuditChannel();
                    vm.auditId = $routeParams.auditId;
                }
            });
        }
    }
})();