(function() {
    'use strict';

    angular
        .module('app.events')
        .controller('EventsList', EventsList);

    EventsList.$inject = ['eventsService', '$timeout'];

    function EventsList(eventsService, $timeout) {
        var vm = this;
        vm.events = [];
        vm.selectedEvent = {};
        vm.refresh = refresh;
        vm.selectEvent = selectEvent;

        activate();

        function activate() {
            vm.refresh();
        }

        function selectEvent(event) {
            vm.selectedEvent = event;
        }

        function refresh() {
            vm.events = [];
            $timeout(function() { getEvents(); }, 200); //Timeout para feedback. Provável remoção quando a requisição for para uma api real.
        }

        function getEvents() {
            eventsService.getEvents().then(function(data) {
                vm.events = data;
                vm.selectedEvent = vm.events[0]; //TODO: Move to a better place
            });
        }
    }
})();
