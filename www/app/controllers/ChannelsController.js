(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .controller('ChannelsController', ChannelsController);

    ChannelsController.$inject = ['$scope', '$route', '$routeParams', 'Channel'];
    function ChannelsController($scope, $route, $routeParams, Channel) {
        var vm = this;
        vm.channels = [];

        activate();

        function activate() { 
            Channel.getChannels().then(function(channels){
                vm.channels = channels;
            });
        }
    }
})();