'use strict';

// Register `Portfolio` component, along with its associated controller and template
angular.
  module('portfolio').
  component('portfolio', {
    templateUrl: 'portfolio/portfolio.template.html',
    controller: ['Project', 'Translation', '$scope', '$cookies', '$rootScope',
      function PortfolioController(Project, Translation, $scope, $cookies, $rootScope) {
        var self = this;
        var resourceURL = 'resources/images/projects/';
        var projectURL  = 'projects/';
        var slash = '/';
        var point = '.';
        var low = 'low/';
        var imgName = 'gallery';
        var typeJPG = '.png';
				$scope.dataLoaded = false;
        this.projects = Project.query();
				this.projects.$promise.then(function(){
					$scope.dataLoaded = true;
					console.log($scope.dataLoaded);
          for (var i = 0; i < self.projects.length; i++) {
            self.setCardImage(i);
            self.setCardHref(i);
          }
				});
        this.setCardImage = function (i) {
          if ("imageType" in self.projects[i]) {
            self.projects[i].imageUrl = resourceURL + self.projects[i].type
            + slash + self.projects[i].id + slash + low + imgName + point + self.projects[i].imageType;
          } else {
            self.projects[i].imageUrl = resourceURL + self.projects[i].type
            + slash + self.projects[i].id + slash + low + imgName + typeJPG;
          }
          console.log(self.projects[i].imageUrl);
        }
        this.setCardHref = function (i) {
          self.projects[i].projectURL = self.projects[i].type + slash + self.projects[i].id;
          console.log(self.projects[i].projectURL);
        }
				console.log($scope.dataLoaded);
        /*$scope.selectedlanguage = null;
        this.translate = function() {
          $scope.selectedlanguage = Translation.getTranslation($scope, $scope.selectedlanguage);
        }
        this.translate();*/
				this.orderPropValue = function(data) {
					this.oPV = this.orderProp;
					if (this.oPV == 'name') {
						this.oPV = this.oPV + '.' + $scope.lc.translation.lc;
					}
					//console.log(this.oPV);
					return(this.oPV);
				}
        $scope.lc = $rootScope.lc;
        $rootScope.currentNavItem = 'portfolio';
        this.orderProp = '-date.design';
				this.oPV = this.orderProp;
				//orderPropValue - oPV
        console.log("In PortfolioController - selectedlanguage is: " + $rootScope.selectedlanguage);
				//$scope.
				// function called when api call was a success
				/*function successGettingEmployees(data) {
						$scope.AbsentEmployees.employees = data;
						// api call was a cuess and data loaded fine.
						abEmployees.dataLoaded = true;
				}

				// function called when api call gave an error
				function errorGettingEmployees(data, status) {
						$scope.AbsentEmployees.error = data;
						console.log(status);
				}*/
      }
    ]
  });
