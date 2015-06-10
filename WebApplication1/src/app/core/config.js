(function() {
  'use strict';

  angular.module('app.core')
    .config(config)
    .run(run);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  run.$inject = ['$rootScope', '$state'];

  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    //To remove # from url
    $locationProvider.html5Mode(true);

    //Default route
  	$urlRouterProvider.otherwise("/");

  	$stateProvider
  	    .state('home', {
  	        url: "/",
  	        templateUrl: "app/layout/home.html",
  	        data: {
  	            pageTitle: "Home"
  	        }
  	    });
  };

  //TODO: Move to another file
  function run($rootScope, $state) {
    $rootScope.states = {};
    function updateStates() {
      // Creates a flat object for each state name and whether it is currently
      // active, based on $state.includes
      angular.forEach($state.get(), function (state) {
        $rootScope.states[state.name] = $state.includes(state.name)
      });
    }
    updateStates();
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      updateStates();
    })
  };
})();