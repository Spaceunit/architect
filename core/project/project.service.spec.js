'use strict';

describe('Project', function() {
  var $httpBackend;
  var Project;
  var projectsData = [
    {name: 'Project X'},
    {name: 'Project Y'},
    {name: 'Project Z'}
  ];

  // Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `Project` service before each test
  beforeEach(module('core.project'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _Project_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('projects/projects.json').respond(projectsData);

    Project = _Project_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the projects data from `projects/projects.json`', function() {
    var projects = Project.query();

    expect(projects).toEqual([]);

    $httpBackend.flush();
    expect(projects).toEqual(projectsData);
  });

});
