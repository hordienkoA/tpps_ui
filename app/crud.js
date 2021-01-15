myApp.factory('crud', ['$http', '$mdToast', function ($http, $mdToast) {
    // var TEST_JSON = '/test.json';
    // var TEST = '/test/';
    var API = 'http://localhost:8080/buyfly-0.0.1/api/';


    var REMOVED = 'Successfully removed';
    var UPDATED = 'Successfully updated';
    var CREATED = 'Successfully created';

    var displayToast = function (type, msg) {
        $mdToast.show({
            template: '<md-toast class="md-toast ' + type + '">' + msg + '</md-toast>',
            hideDelay: 3000,
            position: 'bottom right'
        });
    };

    var o = [];
    o.BoardingPass = [
        {
            id: 1,
            bookingDate: new Date(),
            user_id: 1,
            status: 'DONE',
            flight_id: 1,
            seat_id: 1,
            checkedLuggagePrice: 1222,
            additionalWeightPrice: 122
        },
        {
            id: 2,
            bookingDate: new Date(),
            user_id: 1,
            status: 'BOOKED',
            flight_id: 1,
            seat_id: 1,
            checkedLuggagePrice: 1222,
            additionalWeightPrice: 122
        }
    ];
    o.Seat = [
        {
            id: 1,
            number: 1,
            price: 12.1,
            seatClass: 'F',
            taken: false,
            aircraft_id: 1
        }
    ];
    o.Aircraft = [{
        id: 1,
        name: "Boeingy",
        model: "737"
    }, {
        id: 2,
        name: "2",
        model: "737"
    }];
    o.Airport = [{
        id: 1,
        name: 'originAirport',
        ICAO: 'QQQQ',
        IATA: 'WWW',
        taxPrice: 100,
        city_id: 1
    }, {
        id: 2,
        name: 'destinationAirport',
        ICAO: 'QQQQ',
        IATA: 'WWW',
        taxPrice: 100,
        city_id: 2
    }];
    o.Flight = [
        {
            id: 1,
            number: 'WE 798',
            boardingTime: new Date(),
            departureTime: new Date(),
            arrivalTime: new Date(),
            gate: 'G8',
            originAirportId: 1,
            destinationAirportId: 2,
            aircraftId: 1
        },
        {
            id: 2,
            number: 'WE 798',
            boardingTime: new Date(),
            departureTime: new Date(),
            arrivalTime: new Date(),
            gate: 'G8',
            originAirportId: 1,
            destinationAirportId: 2,
            aircraftId: 1
        },
        {
            id: 3,
            number: 'WE 798',
            boardingTime: new Date(),
            departureTime: new Date(),
            arrivalTime: new Date(),
            gate: 'G8',
            originAirportId: 1,
            destinationAirportId: 2,
            aircraftId: 1
        },
        {
            id: 4,
            number: 'WE 798',
            boardingTime: new Date(),
            departureTime: new Date(),
            arrivalTime: new Date(),
            gate: 'G8',
            originAirportId: 1,
            destinationAirportId: 2,
            aircraftId: 1
        }
    ];
    o.City = [{
        id: 1,
        name: 'City',
        country: 'Cpuntyr',
    }, {
        id: 2,
        name: 'City',
        country: 'Cpuntyr',
    }];
    o.User = [
        {
            id: 1,
            password: '12',
            userRole: 'ADMIN',
            registered: true,
            enabled: true,
            firstName: 'test',
            lastName: 'test',
            sex: 'M',
            dateOfBirth: new Date(),
            phoneNumber: '121212',
            email: 'test@TEST.COM',
            documentNumber: 'asdasd',
            documentExpirationDate: new Date()
        }, {
            id: 2,
            password: '12',
            userRole: 'MANAGER',
            registered: true,
            enabled: true,
            firstName: 'test',
            lastName: 'test',
            sex: 'M',
            dateOfBirth: new Date(),
            phoneNumber: '121212',
            email: 'test@TEST.COM',
            documentNumber: 'asdasd',
            documentExpirationDate: new Date()
        },
        {
            id: 3,
            password: '12',
            userRole: 'CUSTOMER',
            registered: true,
            enabled: true,
            firstName: 'test',
            lastName: 'test',
            sex: 'M',
            dateOfBirth: new Date(),
            phoneNumber: '121212',
            email: 'test@TEST.COM',
            documentNumber: 'asdasd',
            documentExpirationDate: new Date()
        },
        {
            id: 4,
            password: '12',
            userRole: 'CUSTOMER',
            registered: true,
            enabled: true,
            firstName: 'test',
            lastName: 'test',
            sex: 'M',
            dateOfBirth: new Date(),
            phoneNumber: '121212',
            email: 'test@TEST.COM',
            documentNumber: 'asdasd',
            documentExpirationDate: new Date()
        }
    ];


    o.create = function (item, GET_JSON, onSuccess, onError) {
        if (GET_JSON === 'boardingPasses/') {
            item.id = o.BoardingPass.length + 1;
            o.BoardingPass.push(item);
            displayToast('success ', CREATED);
        } else if (GET_JSON === 'seats/') {
            item.id = o.Seat.length + 1;
            o.Seat.push(item);
            displayToast('success ', CREATED);
        } else if (GET_JSON === 'airports/') {
            item.id = o.Airport.length + 1;
            o.Airport.push(item);
            displayToast('success ', CREATED);
        } else if (GET_JSON === 'flights/') {
            item.id = o.Flight.length + 1;
            o.Flight.push(item);
            displayToast('success ', CREATED);
        } else if (GET_JSON === 'cities/') {
            item.id = o.City.length + 1;
            o.City.push(item);
            displayToast('success ', CREATED);
        } else if (GET_JSON === 'users/') {
            item.id = o.User.length + 1;
            o.User.push(item);
            displayToast('success ', CREATED);
        } else if (GET_JSON === 'aircraft/') {
            item.id = o.Aircraft.length + 1;
            o.Aircraft.push(item);
            displayToast('success ', CREATED);
        } else {
            displayToast('error  ', 'Don`t create');
        }
        // return $http.post(API + GET_JSON, item)
        //     .success(function (data) {
        //         displayToast('success ',CREATED);
        //     }).error(function (data, status, headers, config, statusText) {
        //         var toastContent = 'URL:' + config.url + ' :: Error: ' + status;
        //         displayToast('error  ',toastContent);
        //     });
    };

    o.read = function (GET_JSON, onSuccess, onError) {
        if (GET_JSON === 'boardingPasses/') {
            onSuccess(o.BoardingPass);
        } else if (GET_JSON === 'seats/') {
            onSuccess(o.Seat);
        } else if (GET_JSON === 'airports/') {
            onSuccess(o.Airport);
        } else if (GET_JSON === 'flights/') {
            onSuccess(o.Flight);
        } else if (GET_JSON === 'cities/') {
            onSuccess(o.City);
        } else if (GET_JSON === 'users/') {
            onSuccess(o.User);
        } else if (GET_JSON === 'aircraft/') {
            onSuccess(o.Aircraft);
        } else {
            displayToast('error  ', 'Don`t get all');
        }
        // return $http.get(API + GET_JSON)
        //     .success(function (data) {
        //         onSuccess(data)
        //     })
        //     .error(function (data, status, headers, config, statusText) {
        //         var toastContent = 'URL:' + config.url + ' :: Error: ' + status;
        //         displayToast('error  ', toastContent);
        //     });
    };

    o.update = function (item, GET_JSON, onSuccess, onError) {
        if (GET_JSON === 'boardingPasses/') {
            displayToast('success ', UPDATED);
        } else if (GET_JSON === 'seats/') {
            displayToast('success ', UPDATED);
        } else if (GET_JSON === 'airports/') {
            displayToast('success ', UPDATED);
        } else if (GET_JSON === 'flights/') {
            displayToast('success ', UPDATED);
        } else if (GET_JSON === 'cities/') {
            displayToast('success ', UPDATED);
        } else if (GET_JSON === 'users/') {
            displayToast('success ', UPDATED);
        } else if (GET_JSON === 'aircraft/') {
            displayToast('success ', UPDATED);
        } else {
            displayToast('error  ', 'Don`t updated');
        }
    };

    o.delete = function (item, GET_JSON, onSuccess, onError) {
        var index = -1;
        if (GET_JSON === 'boardingPasses/') {
            o.BoardingPass.some(function (el, key) {
                if (el.id === item.id) {
                    o.BoardingPass.splice(key, 1);
                    return true;
                }
                return false;
            })
            displayToast('success ', REMOVED);
        } else if (GET_JSON === 'seats/') {
            o.Seat.some(function (el, key) {
                if (el.id === item.id) {
                    o.Seat.splice(key, 1);
                    return true;
                }
                return false;
            })
            displayToast('success ', REMOVED);
        } else if (GET_JSON === 'airports/') {
            o.Airport.some(function (el, key) {
                if (el.id === item.id) {
                    o.Airport.splice(key, 1);
                    return true;
                }
                return false;
            })
            displayToast('success ', REMOVED);
        } else if (GET_JSON === 'flights/') {
            o.Flight.some(function (el, key) {
                if (el.id === item.id) {
                    o.Flight.splice(key, 1);
                    return true;
                }
                return false;
            })
            displayToast('success ', REMOVED);
        } else if (GET_JSON === 'cities/') {
            o.City.some(function (el, key) {
                if (el.id === item.id) {
                    o.City.splice(key, 1);
                    return true;
                }
                return false;
            })
            displayToast('success ', REMOVED);
        } else if (GET_JSON === 'users/') {
            o.User.some(function (el, key) {
                if (el.id === item.id) {
                    o.User.splice(key, 1);
                    return true;
                }
                return false;
            })
            displayToast('success ', REMOVED);
        } else if (GET_JSON === 'aircraft/') {
            o.Aircraft.some(function (el, key) {
                if (el.id === item.id) {
                    o.Aircraft.splice(key, 1);
                    return true;
                }
                return false;
            })
            displayToast('success ', REMOVED);
        } else {
            displayToast('error  ', 'Don`t removed');
        }

    };

    return o;
}]);
