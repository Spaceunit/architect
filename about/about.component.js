//main.component.js
'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('about').
  component('about', {
    templateUrl: 'about/about.template.html',
    controller: ['Translation', '$scope', '$cookies', '$rootScope',
      function AboutController(Translation, $scope, $cookies, $rootScope) {
        $scope.lc = $rootScope.lc;
        $scope.selectedlanguage = null;
        $rootScope.currentNavItem = 'about';
      }
    ]
  });
