(function() {
    'use strict';

    angular
        .module('app.events')
        .controller('EventsDetails', EventsDetails);

    EventsDetails.$inject = ['eventsService', '$stateParams'];

    function EventsDetails(eventsService, $stateParams) {
        var vm = this;
        vm.event = null;

        activate();

        function activate() {
            vm.event = eventsService.get($stateParams.id);
        }
    }
})();
