(function() {
    'use strict';

    angular
        .module('app.events')
        .controller('EventsCreate', EventsCreate);

    EventsCreate.$inject = ['eventsService'];

    function EventsCreate(eventsService) {
        var vm = this;
        vm.save = save;

        activate();

        function activate() {
            vm.event = {
                id: '0',
                printerId: '1',
                criticyLevel: 'Primary',
                dateEventOccurrence: new Date().toLocaleDateString(),
                descriptionEvent: "",
                type: "User Event"
            };
            vm.levels = ["Success","Info","Warning", "Danger" ];
        }

        function save() {
            eventsService.postEvent(vm.event).then(function(results) {
                //                
            });
        }
    }
})();