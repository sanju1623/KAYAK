var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('HotelListings');
        var res = {};
        console.log('---------------IN UPDATE HOTEL LISTINGS');
        console.log(msg);
        console.log('---------------IN UPDATE HOTEL LISTINGS');
        //
        // updateSingleRoomPrice: '150',
        //     after handle in server.js Success Hotel updation
        // updateDoubleRoomPrice: 410,
        //     updatesuitRoomPrice: 534,



        var updateJson={Name:msg.HotelName,Address:msg.HotelAddress,hotelsDateFrom:msg.HotelsDateFrom.substr(0,10),hotelsDateTo:msg.HotelsDateTo.substr(0,10),City:msg.HotelCity,State:msg.HotelState,Rooms:{singleRoomPrice:msg.updateSingleRoomPrice,doubleRoomPrice:msg.updateDoubleRoomPrice,suitRoomPrice:msg.updatesuitRoomPrice}};
        coll.update({hotelId:(msg.HotelId)},{$set : updateJson},function(err, hotels) {
            if (hotels) {
                console.log("Hotel Listing updated");

                //res.redirect(201,'/login');
                res.code = "201";
                res.value = "Success Hotel updation";
            } else {
                console.log("Hotel updation failed");
                res.code = "400";
                res.value = "failure Hotel updation";
            }
            console.log("1: " + res.code);
            callback(null, res);
        })
    })
}

exports.handle_request = handle_request;
