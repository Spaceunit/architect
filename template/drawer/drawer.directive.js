//footer.directive.js
'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.module('drawer')
    /*.controller('FooterController', ['$scope', function ($scope) {
        //do some stuff
    }])*/
    .directive('drawer', function () {
        return {
            restrict: 'A',
            templateUrl: 'template/drawer/drawer.template.html'
        };
    });
