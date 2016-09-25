'use strict';

angular.
  module('core.project').
  factory('Project', ['$resource',
    function($resource) {
      return $resource('projects/:projectType/:projectId.json', {}, {
        query: {
          method: 'GET',
          params: {projectType: null, projectId: 'projects'},
					cache: false,
          isArray: true
        }
      });
    }
  ]);
