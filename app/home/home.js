'use strict';

angular.module('myApp.home', ['ngRoute'])
    .controller('HomeCtrl', ['$scope', '$rootScope', 'crud', '$http', '$mdDialog', function ($scope, $rootScope, crud, $http, $mdDialog) {
        $scope.currentNavItem = 'flights';
        $scope.optionName = 'More';
        $scope.showOptions = false;
        $scope.nameFlex = 40;
        $scope.changeMode = true;

        var BOARDING_PASSES = 'boardingPasses/';
        var SEATS = 'seats/';
        var AIRPORTS = 'airports/';
        var FLIGHTS = 'flights/';
        var CITIES = 'cities/';
        var USERS = 'users/';
        var AIRCRAFT = 'aircraft/';

        $rootScope.BoardingPasses = [];
        $rootScope.Seats = [];
        $rootScope.Airports = [];
        $rootScope.Flights = [];
        $rootScope.Cities = [];
        $rootScope.Users = [];
        $rootScope.Aircrafts = [];

        crud.read(BOARDING_PASSES, function (data) {
            $rootScope.BoardingPasses = data;
        });
        crud.read(SEATS, function (data) {
            $rootScope.Seats = data;
        });
        crud.read(AIRPORTS, function (data) {
            $rootScope.Airports = data;
        });
        crud.read(FLIGHTS, function (data) {
            $rootScope.Flights = data;
        });
        crud.read(CITIES, function (data) {
            $rootScope.Cities = data;
        });
        crud.read(USERS, function (data) {
            $rootScope.Users = data;
        });
        crud.read(AIRCRAFT, function (data) {
            $rootScope.Aircrafts = data;
        });

        $scope.findFlight = {};

        $scope.currentUser = $rootScope.Users.filter(function (item) {
            return item.userRole === $rootScope.role;
        })[0];

        $scope.$watch('role', function () {
            $scope.currentUser = $rootScope.Users.filter(function (item) {
                return item.userRole === $rootScope.role;
            })[0];
        })

        $scope.find = function () {
            $scope.currentNavItem = 'flights';
            return $http.get('/api/flights/search.json', $scope.findFlight)
                .success(function (data) {
                    $rootScope.Flights = data;
                })
                .error(function (data, status, headers, config, statusText) {
                    var toastContent = 'URL:' + config.url + ' :: Error: ' + status;
                    if (onError != null) {
                        onError(error);
                    }
                });

        };

        $scope.findById = function (id, o) {
            for (var i = 0; i < o.length; i++) {
                if (o[i].id === id) {
                    return o[i];
                }
            }
        };

        $scope.deleteFlight = function (flight) {
            crud.delete(flight, FLIGHTS);
            crud.read(FLIGHTS, function (data) {
                $rootScope.Flights = data;
            });
        };

        $scope.deleteAirport = function (airport) {
            crud.delete(airport, AIRPORTS);
            crud.read(AIRPORTS, function (data) {
                $rootScope.Airports = data;
            });
        };

        $scope.deleteAircraft = function (aircraft) {
            crud.delete(aircraft, AIRCRAFT);
            crud.read(AIRCRAFT, function (data) {
                $rootScope.Aircrafts = data;
            });
        };

        $scope.deleteCity = function (city) {
            crud.delete(city, CITIES);
            crud.read(CITIES, function (data) {
                $rootScope.Cities = data;
            });
        };

        $scope.deleteSeat = function (seat) {
            crud.delete(seat, SEATS);
            crud.read(SEATS, function (data) {
                $rootScope.Seats = data;
            });
        };

        $scope.editFlight = function (flight) {
            $mdDialog.show({
                controller: DialogAddFlightController,
                templateUrl: 'dialogs/flight.html',
                clickOutsideToClose: true,
                locals: {
                    flight: flight
                }
            })
                .then(function (flight) {
                    crud.update(flight, FLIGHTS);
                    crud.read(FLIGHTS, function (data) {
                        $rootScope.Flights = data;
                    });
                }, function () {
                });
        };

        $scope.editAirport = function (airport) {
            $mdDialog.show({
                controller: DialogAddAirportController,
                templateUrl: 'dialogs/airport.html',
                clickOutsideToClose: true,
                locals: {
                    airport: airport
                }
            })
                .then(function (airport) {
                    crud.update(airport, AIRPORTS);
                    crud.read(AIRPORTS, function (data) {
                        $rootScope.Airports = data;
                    });
                }, function () {
                });
        };

        $scope.editAircraft = function (aircraft) {
            $mdDialog.show({
                controller: DialogAddAircraftController,
                templateUrl: 'dialogs/aircraft.html',
                clickOutsideToClose: true,
                locals: {
                    aircraft: aircraft
                }
            })
                .then(function (aircraft) {
                    crud.update(aircraft, AIRCRAFT);
                    crud.read(AIRCRAFT, function (data) {
                        $rootScope.Aircrafts = data;
                    });
                }, function () {
                });
        };


        $scope.editCity = function (city) {
            $mdDialog.show({
                controller: DialogAddCityController,
                templateUrl: 'dialogs/city.html',
                clickOutsideToClose: true,
                locals: {
                    city: city
                }
            })
                .then(function (city) {
                    crud.update(city, CITIES);
                    crud.read(CITIES, function (data) {
                        $rootScope.Cities = data;
                    });
                }, function () {
                });
        };

        $scope.editSeat = function (seat) {
            $mdDialog.show({
                controller: DialogAddSeatController,
                templateUrl: 'dialogs/seat.html',
                clickOutsideToClose: true,
                locals: {
                    seat: seat
                }
            })
                .then(function (seat) {
                    crud.update(seat, SEATS);
                    crud.read(SEATS, function (data) {
                        $rootScope.Seats = data;
                    });
                }, function () {
                });
        };

        $scope.addFlight = function () {
            var flight = {boardingTime: new Date(), departureTime: new Date(), arrivalTime: new Date()};
            $mdDialog.show({
                controller: DialogAddFlightController,
                templateUrl: 'dialogs/flight.html',
                clickOutsideToClose: true,
                locals: {
                    flight: flight
                }
            })
                .then(function (flight) {
                    crud.create(flight, FLIGHTS);
                    crud.read(FLIGHTS, function (data) {
                        $rootScope.Flights = data;
                    });
                }, function () {
                });
        };

        $scope.addAirport = function () {
            $mdDialog.show({
                controller: DialogAddAirportController,
                templateUrl: 'dialogs/airport.html',
                clickOutsideToClose: true,
                locals: {
                    airport: {}
                }
            })
                .then(function (airport) {
                    crud.create(airport, AIRPORTS);
                    crud.read(AIRPORTS, function (data) {
                        $rootScope.Airports = data;
                    });
                }, function () {
                });
        };

        $scope.addAircraft = function () {
            $mdDialog.show({
                controller: DialogAddAircraftController,
                templateUrl: 'dialogs/aircraft.html',
                clickOutsideToClose: true,
                locals: {
                    aircraft: {}
                }
            })
                .then(function (aircraft) {
                    crud.create(aircraft, AIRCRAFT);
                    crud.read(AIRCRAFT, function (data) {
                        $rootScope.Aircrafts = data;
                    });
                }, function () {
                });
        };

        $scope.addCity = function () {
            $mdDialog.show({
                controller: DialogAddCityController,
                templateUrl: 'dialogs/city.html',
                clickOutsideToClose: true,
                locals: {
                    city: {}
                }
            })
                .then(function (city) {
                    crud.create(city, CITIES);
                    crud.read(CITIES, function (data) {
                        $rootScope.Cities = data;
                    });
                }, function () {
                });
        };

        $scope.addSeat = function () {
            $mdDialog.show({
                controller: DialogAddSeatController,
                templateUrl: 'dialogs/seat.html',
                clickOutsideToClose: true,
                locals: {
                    seat: {}
                }
            })
                .then(function (seat) {
                    crud.create(seat, SEATS);
                    crud.read(SEATS, function (data) {
                        $rootScope.Seats = data;
                    });
                }, function () {
                });
        };

        $scope.showBooked = function (flightId, currentUserId) {
            $mdDialog.show({
                controller: DialogBookController,
                templateUrl: 'dialogs/book.html',
                clickOutsideToClose: true
            })
                .then(function (boardingPasse) {
                    boardingPasse.status = "BOOKED";
                    boardingPasse.userId = currentUserId;
                    boardingPasse.flightId = flightId;
                    boardingPasse.bookingDate = new Date();
                    crud.create(boardingPasse, BOARDING_PASSES);
                    crud.read(BOARDING_PASSES, function (data) {
                        $rootScope.BoardingPasses = data;
                    });
                }, function () {
                });
        };

        $scope.toggleOptions = function () {
            $scope.showOptions = !$scope.showOptions;
            $scope.optionName = $scope.showOptions ? 'Less' : 'More';
        };

        function DialogBookController($scope, $mdDialog) {
            crud.read(SEATS, function (data) {
                $scope.Seats = data;
            });
            $scope.boardingPasse = {};

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (boardingPasse) {
                $mdDialog.hide(boardingPasse);
            };
        }

        function DialogAddFlightController($scope, $mdDialog, flight) {
            crud.read(AIRPORTS, function (data) {
                $scope.Airports = data;
            });
            crud.read(AIRCRAFT, function (data) {
                $scope.Aircrafts = data;
            });
            $scope.flight = flight;

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (flight) {
                $mdDialog.hide(flight);
            };
        }

        function DialogAddAirportController($scope, $mdDialog, airport) {
            crud.read(CITIES, function (data) {
                $scope.Cities = data;
            });
            $scope.airport = airport;
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (airport) {
                $mdDialog.hide(airport);
            };
        }

        function DialogAddAircraftController($scope, $mdDialog, aircraft) {
            $scope.aircraft = aircraft;
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (aircraft) {
                $mdDialog.hide(aircraft);
            };
        }

        function DialogAddCityController($scope, $mdDialog, city) {
            $scope.countries = ['United States', 'United Kingdom', 'Ukraine', "United Arab Emirates", "Poland", "Finland", 'France'];

            $scope.city = city;
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (city) {
                $mdDialog.hide(city);
            };
        }

        function DialogAddSeatController($scope, $mdDialog, seat) {
            $scope.seatClasses = ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', "FIRST"];

            $scope.seat = seat;
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (seat) {
                $mdDialog.hide(seat);
            };
        }

        $scope.findBooked = function (o) {
            var arr = []
            for (var i = 0; i < o.length; i++) {
                if (o[i].status == 'BOOKED') {
                    arr.push(o[i]);
                }
            }
            return arr
        };

        $scope.findTicketUser = function (userId, o) {
            var arr = []
            for (var i = 0; i < o.length; i++) {
                if (o[i].user_id == userId) {
                    arr.push(o[i]);
                }
            }
            return arr
        };

        $scope.findNotBooked = function (o) {
            var arr = []
            for (var i = 0; i < o.length; i++) {
                if (o[i].status != 'BOOKED') {
                    arr.push(o[i]);
                }
            }
            return arr
        };

        $scope.findById = function (id, o) {
            for (var i = 0; i < o.length; i++) {
                if (o[i].id == id) {
                    return o[i];
                }
            }
        };

        $scope.changeTicketStatus = function (boardingPasse, status) {
            boardingPasse.status = status;
            crud.update(boardingPasse, BOARDING_PASSES);
            crud.read(BOARDING_PASSES, function (data) {
                $rootScope.BoardingPasses = data;
            });
        };

    }])

