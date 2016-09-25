'use strict';

describe('projectDetail', function() {

  // Load the module that contains the `projectDetail` component before each test
  beforeEach(module('projectDetail'));

  // Test the controller
  describe('projectDetailController', function() {
    var $httpBackend, ctrl;
    var xyzProjectData = {
      name: 'project xyz',
      images: ['resources/images/041.jpg', 'resources/images/041.jpg']
    };

    beforeEach(inject(function($componentController, _$httpBackend_, $routeParams) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('projects/xyz.json').respond(xyzProjectData);

      $routeParams.projectId = 'xyz';

      ctrl = $componentController('projectDetail');
    }));

    it('should fetch the project details', function() {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.project).toEqual({});

      $httpBackend.flush();
      expect(ctrl.project).toEqual(xyzProjectData);
    });

  });

});
