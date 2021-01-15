'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.home',
    'myApp.profile',
    'ngMaterial',
    'ngMessages'
])

myApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
    $routeProvider.when('/profile', {
        templateUrl: 'profile/profile.html',
        controller: 'ProfileCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/home'});
}])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('teal')
            .accentPalette('blue')
            .warnPalette('red')
            .backgroundPalette('grey');
    });

myApp.controller('AppCtrl', ['$scope', '$rootScope', '$mdDialog', '$location', function ($scope, $rootScope, $mdDialog, $location) {
    $rootScope.root = '';

    $scope.showRegister = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialogs/register.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (answer) {
                $rootScope.testuser = answer;
            }, function () {
            });
    };

    $scope.showLogin = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialogs/login.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (answer) {
                $rootScope.role = answer;
            }, function () {
            });
    };

    $scope.exit = function () {
        $rootScope.role = '';
        $location.path('/home');
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }
}])

myApp.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v) {
                if (v) {
                    elm.show();
                } else {
                    console.log()
                    elm.hide();
                }
            });
        }
    };
}]);



