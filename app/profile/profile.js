'use strict';

angular.module('myApp.profile', ['ngRoute'])
    .controller('ProfileCtrl', ['$scope', '$rootScope', 'crud', '$mdDialog', function ($scope, $rootScope, crud, $mdDialog) {
        $scope.currentNavItem = 'profile';
        $scope.nameFlex = 35;

        $scope.currentUser = $rootScope.Users.filter(function (item) {
            return item.userRole === $rootScope.role
        })[0];

        $scope.changeMode = true;
        var USERS = 'users/';

        $scope.updateUser = function (user) {
            crud.update(user, USERS);
            crud.read(USERS, function (data) {
                $rootScope.Users = data;
            });
        };
        $scope.deleteUser = function (user) {
            crud.delete(user, USERS);
            crud.read(USERS, function (data) {
                $rootScope.Users = data;
            });
        };

        $scope.editUser = function (user) {
            $mdDialog.show({
                controller: DialogAddUserController,
                templateUrl: 'dialogs/user.html',
                clickOutsideToClose: true,
                locals: {
                    user: user
                }
            })
                .then(function (user) {
                    crud.update(user, USERS);
                    crud.read(USERS, function (data) {
                        $rootScope.Users = data;
                    });
                }, function () {
                });
        };

        $scope.addUser = function () {
            $mdDialog.show({
                controller: DialogAddUserController,
                templateUrl: 'dialogs/user.html',
                clickOutsideToClose: true,
                locals: {
                    user: {dateOfBirth: new Date(), documentExpirationDate: new Date()}
                }
            })
                .then(function (user) {
                    crud.create(user, USERS);
                    crud.read(USERS, function (data) {
                        $rootScope.Users = data;
                    });
                }, function () {
                });
        };

        function DialogAddUserController($scope, $mdDialog, user) {
            $scope.user = user;
            $scope.sex = ['M', 'F', 'C'];
            $scope.role = ['ADMIN', 'MANAGER', 'CUSTOMER'];

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (user) {
                $mdDialog.hide(user);
            };
        }

        $scope.findByRole = function (role, o) {
            var arr = []
            for (var i = 0; i < o.length; i++) {
                if (o[i].userRole == role) {
                    arr.push(o[i]);
                }
            }
            return arr
        };
    }]);