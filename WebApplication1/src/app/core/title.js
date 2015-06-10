(function() {
  'use strict';

  angular.module('app.core')
    .directive('title', title);

  title.$inject = ['$rootScope', '$timeout'];

  function title($rootScope, $timeout) {
    return {
      link: function() {

        var listener = function(event, toState) {

          //TODO: Change the default title to other place
          $timeout(function() {
            $rootScope.title = (toState.data && toState.data.pageTitle) 
            ? toState.data.pageTitle 
            : 'Default title';
          });
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  };
})();