/**
 * New node file
 */
var request = require('request'), express = require('express'), assert = require("assert"), http = require("http");

describe('http tests', function() {

    it('should return the login if the url is correct', function(done) {
        http.get('http://localhost:3001', function(res) {
            assert.equal(500, res.statusCode);
            done();
        })
    });

    it('should not return the home page if the url is wrong', function(done) {
        http.get('http://localhost:3001/test', function(res) {
            assert.equal(404, res.statusCode);
            done();
        })
    });

    it('should login', function(done) {
        request.post('http://localhost:3001/login', {

           form:{
            username : 'Admin@kayak.com',
               password:'admin123'
        }
        }, function(error, response, body) {
            assert.equal(200, response.statusCode);
            done();
        });
    });


    it('SHOULD NOT LOGIN', function(done) {
        request.post('http://localhost:3001/login', {

            form:{
                username : 'sanju',
                password:'14'
            }
        }, function(error, response, body) {
            assert.equal(401, response.statusCode);
            done();
        });
    });

    // it('SHOULD Create Account', function(done) {
    //     request.post('http://localhost:3001/signup', {
    //
    //         form:{
    //             username: 'adsfasdf@gh32hm.com',
    //             password:'tasdfadsf@455',
    //         }
    //     }, function(error, response, body) {
    //         assert.equal(200, response.statusCode);
    //         done();
    //     });
    // });

    it('SHOULD NOT Create Account', function(done) {
        request.post('http://localhost:3001/signup', {

            form:{
                username: 'Admin@kayak.com',
                password:'tasdest123',
            }
        }, function(error, response, body) {
            assert.equal(401, response.statusCode);
            done();
        });
    });


    it('User checking', function(done) {
        request.post('http://localhost:3001/AdminUserCheck', {

            form:{
                username: 'sanju@123.com',
            }
        }, function(error, response, body) {
            assert.equal(204, response.statusCode);
            done();
        });
    });

    it('User checking False', function(done) {
        request.post('http://localhost:3001/AdminUserCheck', {

            form:{
                username: 'anju@123.com',
            }
        }, function(error, response, body) {
            assert.equal(401, response.statusCode);
            done();
        });
    });


    it('Firstname checking', function(done) {
        request.post('http://localhost:3001/AdminUserCheck', {

            form:{
                username:'sanjay@asd.com',
                firstname:'sanjay',
                lastname:'karnati'
            }
        }, function(error, response, body) {
            assert.equal(204, response.statusCode);
            done();
        });
    });

    it('Firstname checking False', function(done) {
        request.post('http://localhost:3001/AdminUserCheck', {

            form:{
                firstname:'sy',
                lastname:'asd'
            }
        }, function(error, response, body) {
            assert.equal(401, response.statusCode);
            done();
        });
    });


    it('Lastname checking', function(done) {
        request.post('http://localhost:3001/AdminUserCheck', {

            form:{
firstname:'sanjay',
                username:'sanjay@asd.com',
                lastname:'karnati'
            }
        }, function(error, response, body) {
            assert.equal(204, response.statusCode);
            done();
        });
    });


    it('Lastname checking False', function(done) {
        request.post('http://localhost:3001/AdminUserCheck', {

            form:{
                lastname:'sy'
            }
        }, function(error, response, body) {
            assert.equal(401, response.statusCode);
            done();
        });
    });



    it('Admin checks user', function(done) {
        request.post('http://localhost:3001/AdminUserCheck', {

            form:{
                username:'ram5@gmail.com'
            }
        }, function(error, response, body) {
            assert.equal(204, response.statusCode);
            done();
        });
    });




    // it('Admin checks unknownuser ', function(done) {
    //     request.post('http://localhost:3001/AdminUserCheck', {
    //
    //         form:{
    //             username:'ramgmail.com',
    //             lastname:'ramgmail.coasm',
    //             firstname:'ramgmail.coasm',
    //
    // }
    //     }, function(error, response, body) {
    //         assert.equal(401, response.statusCode);
    //         done();
    //     });
    // });


    // WORKING

    it('Car Availability ', function(done) {
        request.post('http://localhost:3001/carAvailabilityCheck', {

            form: {
                "place": 'austin',
                "pickupdate": '2017-12-13T08:00:00.000Z',
                "dropoffdate": '2017-12-15T08:00:00.000Z'
            }

        }, function(error, response, body) {
            assert.equal(204, response.statusCode);
            done();
        });
    });

// 11th test case working

    it('Car Not Available  ', function(done) {
        request.post('http://localhost:3001/carAvailabilityCheck', {

            form: {
                "place": 'atin',
                "pickupdate": '2017-12-13T08:00:00.000Z',
                "dropoffdate": '2017-12-15T08:00:00.000Z'
            }

        }, function(error, response, body) {
            assert.equal(401, response.statusCode);
            done();
        });
    });

//12 th change params

// it('Delete User', function(done) {
//         request.post('http://localhost:3001/DeleteUser', {
//
//             form: {
//                "username":'ram@gmail.com'
//             }
//
//         }, function(error, response, body) {
//             assert.equal(204, response.statusCode);
//             done();
//         });
//     });

//13th

    // it('Can not Delete User', function(done) {
    //     request.post('http://localhost:3001/DeleteUser', {
    //
    //         form: {
    //             "username":"rm@gmail.com"
    //         }
    //
    //     }, function(error, response, body) {
    //         assert.equal(204, response.statusCode);
    //         done();
    //     });
    // });


//14 Get car data working

    it('Get Car Data', function(done) {
        request.get('http://localhost:3001/carDetails?place=austin&dropoff=Fri%20Dec%2015%202017%2000:00:00%20GMT-0800%20(Pacific%20Standard%20Time)&pickup=Wed%20Dec%2013%202017%2000:00:00%20GMT-0800%20(Pacific%20Standard%20Time', {
        }, function(error, response, body) {
            assert.equal(200, response.statusCode);
            done();
        });
    });



//15 working

    it('Check Flight Available', function(done) {
        request.post('http://localhost:3001/FlightAvailabilityCheck', {
            form:{ "placefrom" : "boston",
                "placeto": 'columbus',
                "departdate": '2018-01-21T08:00:00.000Z' }

        }, function(error, response, body) {


            assert.equal(204, response.statusCode);
            done();
        });
    });



//16

    it('get FLight Available', function(done) {
        request.get('http://localhost:3001/flightDetails?placefrom=boston&placeto=columbus&datefrom=Sun%20Jan%2021%202018%2000:00:00%20GMT-0800%20(Pacific%20Standard%20Time)&dateto=null&adultCount=1&childCount=0&seniorsCount=0&flightCabin=Economy', {

        }, function(error, response, body) {
            assert.equal(200, response.statusCode);
            done();
        });
    });




        it('can hotel Available', function(done) {
        request.get('http://localhost:3001/flightDetails?placefrom=bostn&placeto=cobus&datefrom=Sun%20Jan%2021%202018%2000:00:00%20GMT-0800%20(Pacific%20Standard%20Time)&dateto=null&adultCount=1&childCount=0&seniorsCount=0&flightCabin=Economy', {

        }, function(error, response, body) {
            assert.equal(200, response.statusCode);
            done();
        });
    });









//17

    it('Check Flight Available', function(done) {
        request.post('http://localhost:3001/FlightAvailabilityCheck', {
            form:{ "placefrom" : "boston",
                "placeto": 'columbus',
                "departdate": '2018-01-21T08:00:00.000Z' }

        }, function(error, response, body) {


            assert.equal(204, response.statusCode);
            done();
        });
    });


// 18 working

//    postHotel
//
//     it('post Hotel', function(done) {
//         request.post('http://localhost:3001/hotelDetails', {
//             form:{
//                 "hotelPlace":'Marriot',
//                 "hotelsDateFrom":'2018-12-25T',
//                 "hotelsDateTo":'2018-12-28T'
//             }
//
//         }, function(error, response, body) {
//             assert.equal(401, response.statusCode);
//             done();
//         });
//     });

//19 working

    this.timeout(5000);
    it('post Hotel wont work', function(done) {
        request.post('http://localhost:3001/hotelDetails', {
            form:{
                "hotellace":'Marriot',
                "hotelDateFrom":'2018-12-25T',
                "hotelDateTo":'2018-12-28T'
            }

        }, function(error, response, body) {
            assert.equal(500, response.statusCode);
            done();
        });
    });


//19.Flight not available working

    it('Check Flight not Available', function(done) {
        request.post('http://localhost:3001/FlightAvailabilityCheck', {
            form:{ "placefrom" : "boston2",
                "placeto": 'columbus',
                "departdate": '2018-01-21T08:00:00.000Z' }

        }, function(error, response, body) {


            assert.equal(401, response.statusCode);
            done();
        });
    });












});





