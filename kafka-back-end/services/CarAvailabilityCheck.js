var MongoConPool=require("./MongoConPool");

function handle_request(msg, callback){
    var res = {};
    try {
        console.log("In handle request:"+ JSON.stringify(msg));
        // -----------------------
        //     { id: 1,
        //         price: '79',
        //         category: 'car',
        //         carPickupPlace: 'houston',
        //         carsDatePickUp: '2017-11-26T08:00:00.000Z',
        //         carsDateDropOff: '2017-11-30T08:00:00.000Z',
        //         carsTimePickUp: '2017-11-27T11:25:19.588Z',
        //         carsTimeDropOff: '2017-11-27T12:25:23.620Z' }
        // -----------------------
        var pickup=msg.pickupdate.split('T');
        var dropoff=msg.dropoffdate.split('T');
        //var pickupdate=new Date(pickup[0]);

        var queryJson={Place: msg.place,PickUp: {$lte:pickup[0]},DropOff:{$gte:dropoff[0]} };
        MongoConPool.find('CarListings',queryJson,function(err, car){
            // In case of any error return

            if (err) {
                res.code = "401";
                res.value = "Cars not available";
                callback(null, res);
            }
            if (car.length>0) {
                res.code = "204";
                res.value = "Cars available";
                callback(null, res);
            } else {
                res.code = "401";
                res.value = "Cars not available";
                callback(null, res);
            }
        });
    }
    catch (e){
        res.code = "401";
        res.value = "Cars not available";
        callback(null, res);
    }
}

exports.handle_request = handle_request;