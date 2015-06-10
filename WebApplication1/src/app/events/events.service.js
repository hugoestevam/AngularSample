(function() {
    'use strict';

    angular
        .module('app.events')
        .factory('eventsService', eventsService);

    eventsService.$inject = ['$q'];

    function eventsService($q) {
        var service = {
            getEvents: getEvents,
            get: get
        };

        return service;

        function getEvents() {
            var events = [{"id":0,"type":"System Event","description":"Esta impressora está com papel atolado.","dateEventOccurrence":"13/05/2015","timeElapsed":"01 horas atrás","criticyLevel":"Info","printerName":"Ricoh Aficio MP30001"},{"id":1,"type":"System Event","description":"Esta impressora não envia notificações.","dateEventOccurrence":"13/05/2015","timeElapsed":"12 horas atrás","criticyLevel":"Info","printerName":"Kyocera30011"},{"id":2,"type":"System Event","description":"Esta impressora está sem papel.","dateEventOccurrence":"13/05/2015","timeElapsed":"13 horas atrás","criticyLevel":"Warning","printerName":"Ricoh Aficio MP30021"},{"id":3,"type":"System Event","description":"Esta impressora está sem comunicação.","dateEventOccurrence":"13/05/2015","timeElapsed":"14 horas atrás","criticyLevel":"Info","printerName":"Lexmark30031"},{"id":4,"type":"System Event","description":"Esta impressora Está sem toner azul.","dateEventOccurrence":"13/05/2015","timeElapsed":"15 horas atrás","criticyLevel":"Danger","printerName":"Lexmark30041"},{"id":5,"type":"System Event","description":"Esta impressora não envia notificações.","dateEventOccurrence":"13/05/2015","timeElapsed":"06 horas atrás","criticyLevel":"Danger","printerName":"Thoshiba30051"},{"id":6,"type":"System Event","description":"Esta impressora Está sem toner azul.","dateEventOccurrence":"13/05/2015","timeElapsed":"07 horas atrás","criticyLevel":"Success","printerName":"Kyocera30061"},{"id":7,"type":"System Event","description":"Esta impressora está sem papel.","dateEventOccurrence":"13/05/2015","timeElapsed":"18 horas atrás","criticyLevel":"Success","printerName":"Kyocera30071"},{"id":8,"type":"System Event","description":"Esta impressora não envia notificações.","dateEventOccurrence":"13/05/2015","timeElapsed":"19 horas atrás","criticyLevel":"Danger","printerName":"Ricoh Aficio MP30081"},{"id":9,"type":"System Event","description":"Esta impressora não envia notificações.","dateEventOccurrence":"13/05/2015","timeElapsed":"010 horas atrás","criticyLevel":"Info","printerName":"Thoshiba30091"}];
            return $q.when(events);
        }

        function get(id) {
            return {"id":id,"type":"System Event","description":"Esta impressora está com papel atolado.","dateEventOccurrence":"13/05/2015","timeElapsed":"01 horas atrás","criticyLevel":"Info","printerName":"Ricoh Aficio MP30001"};
        }

    }
})();
