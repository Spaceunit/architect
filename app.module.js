//app.module.js
'use strict';

// Define the `phonecatApp` module
angular.module('myApp', [
    'ngMaterial',
    'ngMessages',
    'ngAnimate',
    'ngAria',
    'ngRoute',
    'ngCookies',
    'portfolio',
    'projectDetail',
    'about',
    'contact',
    'core.translation'
])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('grey')
    .accentPalette('orange');
})
.run(['$rootScope', 'Translation', '$timeout', '$mdSidenav', '$log', '$templateCache',
function ($rootScope, Translation, $timeout, $mdSidenav, $log, $templateCache) {
	$templateCache.removeAll();
  $rootScope.lc = {};
	$rootScope.translationLoaded = false;
  $rootScope.selectedlanguage = null;
  $rootScope.translate = function() {
    $rootScope.selectedlanguage = Translation.getTranslation($rootScope,
       $rootScope.selectedlanguage);
    console.log("In myApp.run - selectedlanguage is: "
     + $rootScope.selectedlanguage);
    $rootScope.observe();
  }
  $rootScope.observe = function () {
    //$rootScope.portfolio.translation = $rootScope.translation;
    //console.log($rootScope.lc.translation.lc);
  }
  $rootScope.translate();

  //$rootScope.toggleLeft = buildDelayedToggler('left');
  $rootScope.toggleLeft = buildToggler('left');
  $rootScope.isOpenLeft = function(){
    return $mdSidenav('left').isOpen();
  };
  $rootScope.sideNavClose = function () {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav('left').close()
    .then(function () {
    $log.debug("close LEFT is done");
    });
  };

  /**
   * Supplies a function that will continue to operate until the
   * time is up.
   */
  function debounce(func, wait, context) {
    var timer;

    return function debounced() {
      var context = $rootScope,
          args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }

  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  function buildDelayedToggler(navID) {
    return debounce(function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }

  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }
  }
}]);
