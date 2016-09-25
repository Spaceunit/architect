'use strict';

angular.
  module('core.translation').
  service('Translation', ['$resource','$cookies', '$rootScope',
    function($resource, $cookies, $rootScope) {
      var self = this;
      this.link = {};
      this.getTranslation = function($rootScope, language) {
        if (language == null && $cookies.get('lang') == null){
          language = 'ua';
        } else {
            if (language == null && $cookies.get('lang') !== null) {
              language = $cookies.get('lang');
            }
        }
        var languageFilePath = 'translations/translation_' + language + '.json';
        $resource(languageFilePath).get(function (data) {
          $rootScope.lc.translation = data;
          $cookies.put('lang', $rootScope.lc.translation.lc);
          language = $rootScope.lc.translation.lc;
        }).$promise.then(function(){
					$rootScope.translationLoaded = true;
					console.log($rootScope.translationLoaded);
				});
        return language;
      }
    }
  ]);
