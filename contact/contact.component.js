//main.component.js
'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('contact').
  component('contact', {
    templateUrl: 'contact/contact.template.html',
    controller: ['Translation', '$scope', '$cookies', '$rootScope',
      function ContactController(Translation, $scope, $cookies, $rootScope) {
        $scope.lc = $rootScope.lc;
        $scope.selectedlanguage = null;
        $rootScope.currentNavItem = 'contact';
      }
    ]
  });
