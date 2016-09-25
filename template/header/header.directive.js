//header.directive.js
'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.module('header')
    .controller('HeaderController', ['$scope','$rootScope','Translation', '$cookies', function ($scope, $rootScope, Translation, $cookies) {
    /*$rootScope.selectedlanguage = $cookies.get('lang');*/
      //Translation.translate($scope);
      //$scope.translation = $rootScope.translation;
      //console.log($scope.translation);
      /*$scope.translate = function() {
        Translation.getTranslation($rootScope, $rootScope.selectedlanguage);
      }
      $scope.translate();*/
    }])
    .directive('header', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            templateUrl: 'template/header/header.template.html'
        };
    });
