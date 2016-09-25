'use strict';
// Register `projectDetail` component, along with its associated controller and template
angular.
  module('projectDetail').
  component('projectDetail', {
    templateUrl: 'project-detail/project-detail.template.html',
    controller: ['$routeParams', 'Project', 'Translation' ,'$scope', '$cookies', '$rootScope', '$mdDialog', '$mdMedia', '$window',
      function ProjectDetailController($routeParams, Project, Translation, $scope, $cookies, $rootScope, $mdDialog, $mdMedia, $window) {
        var self = this;
        //console.log($window.innerHeight);
        //$scope.mywindow = $window;
				var resourceURL = 'resources/images/projects/';
        $scope.num = 0;
        $rootScope.imageID = 1;
        $scope.lc = $rootScope.lc;
        $scope.status = '  ';
        $scope.slide = {
          counter: 0,
          imageUrl: ''
        };
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        console.log($routeParams.projectType);
        console.log($routeParams.projectId);
        self.project = Project.get({projectType: $routeParams.projectType, projectId: $routeParams.projectId}, function(project) {
          console.log("Project array is lol " + self.project.images);
          self.setImage(resourceURL + project.type + '/' + project.id + '/low/' + i + '.' + '.png');
          //$scope.expo = self.project.images;
          $scope.expo = [];
          $scope.description = [];
          self.setDescription();
					var imageID = "";
					console.log(project.images.count);
          for (var i = 0; i < project.images.count; i++) {
						imageID = "i" + i;
						if (imageID in project.images){
							if ("type" in project.images[imageID]){
								$scope.expo.push({
									"url" : resourceURL + project.type + '/' + self.project.id + '/' + i + '.' + self.project.images[imageID].type,
									"lowUrl" : resourceURL + project.type + '/' + self.project.id + '/low/' + i + '.' + self.project.images[imageID].type
								});
                console.log($scope.expo);
							} else {
								$scope.expo.push({
									"url" : resourceURL + project.type + '/' + project.id + '/' + i + '.png',
									"lowUrl" : resourceURL + project.type + '/' + project.id + '/low/' + i + '.png'
								});
							}
							if ("description" in project.images[imageID]){
                $scope.expo[i].description ={
                  "ua" : self.project.images[imageID].description.ua,
									"en" : self.project.images[imageID].description.en,
									"ru" : self.project.images[imageID].description.ru
                }
								//$scope.expo[i].description.ua = self.project.images[imageID].description.ua;
								//$scope.expo[i].description.en = self.project.images[imageID].description.en;
								//$scope.expo[i].description.ru = self.project.images[imageID].description.ru;
							} else {
                $scope.expo[i].description ={
                  "ua" : "",
									"en" : "",
									"ru" : ""
                }
							}
						} else {
							$scope.expo.push({
								"url" : resourceURL + project.type + '/' + project.id + '/' + i + '.png',
								"lowUrl" : resourceURL + project.type + '/' + project.id + '/low/' + i + '.png',
								"description" : {
									"ua" : "",
									"en" : "",
									"ru" : ""
								}
							});
              console.log($scope.expo);
						}
					}
          console.log($scope.expo);
					//$scope.expo = $scope.expo;
        });
        self.setDescriptionDate = function() {
          if ("design" in self.project.date){
            $scope.description.push(
              {
                "type": "design",
                "ua": self.project.date.design,
                "en": self.project.date.design,
                "ru": self.project.date.design
              }
            );
          }
          if ("realization" in self.project.date){
            $scope.description.push(
              {
                "type": "realization",
                "ua": self.project.date.realization,
                "en": self.project.date.realization,
                "ru": self.project.date.realization
              }
            );
          }
        }
        self.setDescription = function () {
          for (var i = 0; i < self.project.description.length; i++) {
            if (self.project.description[i].type !== "visualization" && self.project.description[i].type !== "photo_by") {
              $scope.description.push(self.project.description[i]);
            }
          }
          //console.log(self.project.description.length - 1);
          if (self.project.description[self.project.description.length - 1].type !== "visualization" && self.project.description[self.project.description.length - 1].type !== "photo_by") {
            self.setDescriptionDate();
          } else {
            self.setDescriptionDate();
            $scope.description.push(self.project.description[self.project.description.length - 1]);
          }
        }
        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = imageUrl;
        };
        $scope.showAdvanced = function(ev, index) {
          $scope.slide.counter = index;
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
          console.log(index);
          //$scope.slide.counter = index;
          //self.num = index;
          //self.iterrator = index;
          $mdDialog.show({
            controller: ['$scope','$mdDialog', 'expo', 'imgindex','lc', '$window',
            function($scope, $mdDialog , expo, imgindex, lc, $window) {
              $scope.imgindex = imgindex;
              $scope.imgarray = expo;
							$scope.wheight = $window.innerHeight - 160;
							$scope.wwidth = $window.innerWidth;
              $scope.lc = lc;
              $scope.nextSlide = function() {
                //next slide
                if ($scope.imgindex < $scope.imgarray.length - 1) {
                  $scope.imgindex++;
                } else {
                  $scope.imgindex = 0;
                }
              }
              $scope.previousSlide = function() {
                //next slide
                if ($scope.imgindex > 0) {
                  $scope.imgindex--;
                } else {
                  $scope.imgindex = $scope.imgarray.length - 1;
                }
              }
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
              console.log($scope.imgindex);
              console.log($scope.imgarray);
            }],
            //controllerAs: 'ctrl',
            //bindToController: true,
            locals: {
              imgindex: $scope.slide.counter,
              expo: $scope.expo,
              lc: $scope.lc
              /*cancel: function() {
                $mdDialog.cancel()
              }*/
            },
            templateUrl: 'template/dialog1.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
          })
          .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });
          /*var DetailController = function($scope, imgindex) {
            $scope.someinfo = imgindex;
            console.log(imgindex);
          }*/
          //$rootScope.imageID = index;
          //$scope.slide.imageUrl = $scope.expo[$scope.slide.counter].src;
          //console.log($scope.expo);
          //console.log($scope.expo[$scope.slide.counter].src);

          $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
          }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
          });
        };


        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
        $scope.setSlide = function(ev, image) {
          //$scope.num = index;
          console.log(image);
          $scope.showAdvanced(ev, image);
        }
        $scope.nextSlide = function() {
          //next slide
          if ($scope.slide.counter < self.project.images.length - 1) {
            $scope.slide.counter++;
            $scope.setSlide();
          }
        }
        $scope.previousSlide = function() {
          //next slide
          if ($scope.slide.counter > 0) {
            $scope.slide.counter--;
            $scope.setSlide();
          }
        }

        $rootScope.currentNavItem = 'portfolio';

      }
    ]
  });
