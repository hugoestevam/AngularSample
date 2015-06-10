(function () {

    angular.module('app.widgets')
        .directive('eventPanel', eventPanel);

    function eventPanel() {
        // Usage:
        //  <event-panel event="vm.event"></event-panel>
        return {
            restrict: 'E',
            templateUrl: 'app/widgets/eventpanel.html',
            scope: {
                event: '='
            }
        };
       
    }
})();