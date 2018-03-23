var MongoConPool=require("./MongoConPool");

function handle_request(msg, callback){
    var res = {};
    try {
           console.log(msg);
   var queryJson={Origin: msg.placefrom,Destination:msg.placeto,DepartureDate:msg.departdate};
//        var queryJson={Origin: msg.placefrom,Destination:msg.placeto};

MongoConPool.find('FlightListings',queryJson,function(err, flight){
                // In case of any error return
     console.log('------------------');
                console.log(flight.length);
                console.log('------------------');
                if (err) {
                    res.code = "401";
                    res.value = "Flights not available";
                    callback(null, res);
                }
                if (flight.length>0) {

                    res.code = "204";
                    res.value = "Flights available";
                    callback(null, res);
                } else {
                    res.code = "401";
                    res.value = "Flights not available";
                    callback(null, res);
                }
            });

    }
    catch (e){
        res.code = "401";
        res.value = "Flights not available";
        callback(null, res);
    }

}

exports.handle_request = handle_request;