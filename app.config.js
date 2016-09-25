//app.config.js
angular.module('myApp').config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        //$locationProvider.default.headers.common['Access-Control-Allow-Origin'] = '*';
        //app.use
        $locationProvider.hashPrefix('!');

        $routeProvider.when('/portfolio', {
            template: '<portfolio></portfolio>'
        }).when('/about', {
            template: '<about></about>'
        }).when('/contact', {
            template: '<contact></contact>'
        }).when('/portfolio/:projectType/:projectId', {
            template: '<project-detail></project-detail>'
        }).otherwise('/portfolio');
    }
]);
