var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
function handle_request(msg, callback){
    var res = {};
    try {
        console.log("In handle request:"+ JSON.stringify(msg));
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);
            switch (msg.Type){
                case 'Hotel':
                    var coll = mongo.collection('HotelListings');

                    coll.find({hotelId: msg.ID}).toArray( function(err,hotels){
                        if (err) {
                            res.code = "401";
                            res.value = "Listing not available";
                            callback(null, res);
                        }
                        else {
                            var resArr = [];
                            i=0;
                            resArr = hotels.map(function (file) {
                                var hotelsJSON = {};
                                hotelsJSON.Typeof='Hotel'
                                hotelsJSON.id=hotels[i].hotelId;
                                hotelsJSON.name = hotels[i].Name;
                                hotelsJSON.address = hotels[i].Address;
                                // carsJSON.carName=cars[i].CarName;
                                hotelsJSON.city=hotels[i].City;
                                hotelsJSON.state=hotels[i].State;
                                hotelsJSON.availability=hotels[i].Availability;
                                hotelsJSON.singleRoomPrice=hotels[i].Rooms.singleRoomPrice;
                                hotelsJSON.doubleRoomPrice=hotels[i].Rooms.doubleRoomPrice;
                                hotelsJSON.suitRoomPrice=hotels[i].Rooms.suitRoomPrice;
                                hotelsJSON.ratings=hotels[i].Ratings;
                                hotelsJSON.reviews=hotels[i].Reviews;
                                hotelsJSON.HotelsDateFrom=hotels[i].hotelsDateFrom;
                                hotelsJSON.HotelsDateTo=hotels[i].hotelsDateTo;
                                i=i+1;
                                console.log('--------------');
                                console.log(hotelsJSON);
                                console.log('--------------');
                                return hotelsJSON;
                            });
                            res.code = "200";
                            res.value = "HotelListing Successful";
                            res.arr=resArr;
                            console.log(resArr);
                            callback(null, res);
                        }
                    });
                    break;

                case 'Flight':
                    var coll = mongo.collection('FlightListings');

                    coll.find({FlightId: msg.ID}).toArray( function(err, flights){
                        if (err) {
                            res.code = "401";
                            res.value = "Listing not available";
                            callback(null, res);
                        }

                        else {
                            i=0;
                            var resArr = [];
                            resArr = flights.map(function (file) {
                                var flightsJSON = {};
                                flightsJSON.Typeof='Flight'
                                flightsJSON.FlightID=flights[i].FlightId
                                flightsJSON.Operator = flights[i].Operator;
                                flightsJSON.Origin=flights[i].Origin;
                                flightsJSON.Destination=flights[i].Destination;
                                flightsJSON.DepartureTime=flights[i].DepartureTime;
                                flightsJSON.departuredate=flights[i].DepartureDate
                                flightsJSON.ArrivalTime = flights[i].ArrivalTime;
                                flightsJSON.arrivaldate=flights[i].ArrivalDate;
                                flightsJSON.type=flights[i].Type;
                                flightsJSON.economy = flights[i].Economy;
                                flightsJSON.firstclass=flights[i].FirstClass;
                                flightsJSON.business=flights[i].Business;
                                flightsJSON.totaltime=flights[i].TotalTime;
                                i=i+1;
                                return flightsJSON;

                            });
                            res.code = "200";
                            res.value = "FlightsListing Successful";
                            res.arr=resArr;
                            console.log(resArr);
                            callback(null, res);
                        }
                    });

                    break;

                case 'Car':
                    var coll = mongo.collection('CarListings');

                    coll.find({CarId: msg.ID}).toArray( function(err,cars){
                        if (err) {
                            res.code = "401";
                            res.value = "Listing not available";
                            callback(null, res);
                        }
                        else {
                            var resArr = [];
                            i=0;
                            resArr = cars.map(function (file) {
                                var carsJSON = {};
                                carsJSON.Typeof='Car'
                                carsJSON.id=cars[i].CarId
                                carsJSON.cartype = cars[i].CarType;
                                carsJSON.place = cars[i].Place;
                                carsJSON.pickup = cars[i].PickUp;
                                carsJSON.dropoff = cars[i].DropOff;
                                carsJSON.peopleCount=cars[i].People;
                                carsJSON.bagCount=cars[i].Bags;
                                carsJSON.doorCount=cars[i].Doors;
                                carsJSON.carPrice=cars[i].Price;
                                carsJSON.carcompany=cars[i].Company;
                                i=i+1;
                                return carsJSON;

                            });
                            res.code = "200";
                            res.value = "CarListing Successful";
                            res.arr=resArr
                            console.log(resArr)
                            callback(null, res);
                        }
                    });
            }

        });
    }
    catch (e){
        res.code = "401";
        res.value = "Listing not available";
        callback(null, res);
    }

}

exports.handle_request = handle_request;