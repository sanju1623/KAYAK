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
                    //console.log("HOTELS");
                    console.log('------------');
                    console.log(msg.ID);
                    console.log('------------');
                    coll.find({hotelId: msg.ID}).toArray( function(err, Listing){

                        if (err) {
                            res.code = "401";
                            res.value = "Listing not available";
                            callback(null, res);
                        }

                        if (Listing.length>0) {
                            res.code = "204";
                            res.value = "Listing available";
                            callback(null, res);
                        } else {
                            res.code = "401";
                            res.value = "Listing not available";
                            callback(null, res);
                        }
                    });
                    break;

                case 'Flight':
                    var coll = mongo.collection('FlightListings');

                    coll.find({FlightId: msg.ID}).toArray( function(err, Listing){
                        if (err) {
                            res.code = "401";
                            res.value = "Listing not available";
                            callback(null, res);
                        }

                        if (Listing.length>0) {
                            res.code = "204";
                            res.value = "Listing available";
                            callback(null, res);
                        } else {
                            res.code = "401";
                            res.value = "Listing not available";
                            callback(null, res);
                        }
                    });

                    break;

                case 'Car':
                    var coll = mongo.collection('CarListings');

                    coll.find({CarId:msg.ID}).toArray( function(err, Listing){
                        if (err) {
                            res.code = "401";
                            res.value = "Listing not available";
                            callback(null, res);
                        }

                        if (Listing.length>0) {
                            res.code = "204";
                            res.value = "Listing available";
                            callback(null, res);
                        } else {
                            res.code = "401";
                            res.value = "Listing not available";
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