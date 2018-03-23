var MongoConPool=require("./MongoConPool");
function handle_request(msg, callback){
    var res = {};
    var queryJson={CarId: msg.CarId, CarType:msg.CarType,Place:msg.CarPlace,PickUp:msg.carsDatePickUp ,DropOff:msg.carsDateDropOff,Price: msg.CarPrice,People:msg.CarPeople, Bags:msg.CarBags,Doors:msg.CarDoors};
    var queryJson2={CarId:msg.CarId};
    MongoConPool.findOne('CarListings',queryJson2, function(err,car){
        if (car) {
            console.log("Car Listing Already Exists");
            res.code = "500";
            res.value = "Car Listing Already Exists";
            console.log("2: "+res.code);
            callback(null, res);
        } else {
            MongoConPool.insert('CarListings',queryJson,function(err, car){
                if (car.insertedCount>0) {

                    console.log("New Car Listing Added");
                    //res.redirect(201,'/login');
                    res.code = "201";
                    res.value = "Success Car Listing";
                } else {
                    //res.status(400);
                    console.log("New Car Listing failed");
                    res.code = "400";
                    res.value = "failure New Car Listing";
                }
                console.log("1: "+res.code);
                callback(null, res);
            });
        }
    });
}

exports.handle_request = handle_request;
