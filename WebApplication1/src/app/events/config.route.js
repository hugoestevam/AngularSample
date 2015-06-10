(function() {
    'use strict';

    configureRoute.$inject = ['$stateProvider', '$urlRouterProvider'];

    angular.module('app.events')
        .config(configureRoute);

    //////////////////

    function configureRoute ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('events', {
                url: "/events",
                abstract: true,
                template: "<div data-ui-view></div>"
            })
            .state('events.list', {
                url: "",
                templateUrl: "app/events/events.list.html",
                controller: "EventsList",
                controllerAs: "vm",
                data: {
                    pageTitle: "Events List"
                }
            })
            .state('events.create', {
                url: "/create",
                templateUrl: "app/events/events.create.html",
                controller: "EventsCreate",
                controllerAs: "vm",
                data: {
                    pageTitle: "Events Create"
                }
            })
            .state('events.details', {
                url: "/:id",
                templateUrl: "app/events/events.details.html",
                controller: "EventsDetails",
                controllerAs: "vm",
                data: {
                    pageTitle: "Events Detail"
                }
            });
    };
})();
