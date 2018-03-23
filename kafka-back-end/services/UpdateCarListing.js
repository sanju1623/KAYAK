var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    mongo.connect(mongoURL, function () {
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('CarListings');
            var res = {};
            var updateJson = {
                CarId: msg.CarId,
                CarType: msg.CarType,
                Place: msg.CarPlace,
                PickUp: msg.carsDatePickUp,
                DropOff: msg.carsDateDropOff,
                Price: msg.CarPrice,
                People: msg.CarPeople,
                Bags: msg.CarBags,
                Doors: msg.CarDoors
            };
            console.log(msg.InitialCarId)
            console.log(updateJson)
            coll.update({CarId: msg.InitialCarId}, {$set: updateJson}, function (err, cars) {
                if (cars) {
                    console.log("Car Listing updated");
                    //res.redirect(201,'/login');
                    res.code = "201";
                    res.value = "Success Car updation";
                } else {
                    //res.status(400);
                    console.log("Car updation failed");
                    res.code = "400";
                    res.value = "failure Car updation";
                }
                console.log("1: " + res.code);
                callback(null, res);
            });
        }
    )
}

exports.handle_request = handle_request;
