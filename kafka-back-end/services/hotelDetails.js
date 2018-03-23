var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
var winston = require('winston');
var MongoConPool=require("./MongoConPool");
function hotel_details(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var from=msg.hotelsDateFrom;
        var to=msg.hotelsDateTo;
        var coll = mongo.collection('HotelListings');
        console.log(from);
        console.log(to);
        coll.find({City: msg.City, hotelsDateFrom: {$lt:from},hotelsDateTo: {$gte:to}}).toArray( function(err, hotel)
        {
            res=hotel;
            callback(null, res);
        });
    });
}


function trackHotel(msg,callback) {

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);

        var coll = mongo.collection('KayakTracking');

        console.log('-------#################-------------');
        console.log('INSIDE GRAPHS');
        console.log('-------################-------------');

        if(msg.username!=null) {

            coll.insertOne({
                username: msg.username,
                page: msg.page,
                fromTime: msg.fromTime,
                toTime: msg.toTime
            }, function (err, hotel) {
                //console.log(err);
                res.code = 201;
                //console.log(hotel);
                callback(null, res);
            });
        }
    });

}




function gethoteldetails(msg, callback){

    winston.remove(winston.transports.Console);
    winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
   // winston.log('info', 'Hotel Page Viewed', { page_name : 'Hotels_page'});

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        console.log("ASSSSSSSSSSS");
        console.log(msg.hotelsDateFrom);
        var from=msg.hotelsDateFrom;
        var to=msg.hotelsDateTo;
        var coll = mongo.collection('HotelListings');
        coll.find({City: msg.City, hotelsDateFrom: {$lt:from},hotelsDateTo: {$gte:to}}).toArray( function(err, hotel){

//            coll.find({City: msg.City}).toArray( function(err, hotel){
            res=hotel;
//console.log(res.length);
            var output=[];
            for(var i=0;i<hotel.length;i++)
            {
                var resJson={};
                resJson.Address=hotel[i].Address;
                resJson.City=hotel[i].City;
                resJson.Name=hotel[i].Name;
                resJson.Ratings=hotel[i].Ratings;
                resJson.Reviews=hotel[i].Reviews;
                resJson.Rooms=hotel[i].Rooms;
                resJson.hotelId=hotel[i].hotelId;
                resJson.hotelsDateFrom=hotel[i].hotelsDateFrom;
                resJson.Ratings=hotel[i].Ratings;
                resJson.hotelsDateTo=hotel[i].hotelsDateTo;

                if(msg.roomsType=='Single')
                {
                    resJson.price=hotel[i].Rooms.singleRoomPrice;
                }
                else if(msg.roomsType=='Double')
                {
                    resJson.price=hotel[i].Rooms.doubleRoomPrice;
                }
                else
                {
                    resJson.price=hotel[i].Rooms.suitRoomPrice;
                }
                resJson.roomsType=msg.roomsType;

                output.push(resJson);

            }
            if (msg.user!=undefined) {
                MongoConPool.insert("UserTracking",{username: msg.user,Pagename:"Hotel Listings",sessionid:msg.sid,Date:new Date()}, function (err, user) {
                    if (user.insertedCount > 0) {

                    } else {

                    }
                });

            }
            callback(null, output);

        });
    });

    winston.remove(winston.transports.File);
    winston.add(winston.transports.Console);
}




exports.hotel_details = hotel_details;
exports.gethoteldetails = gethoteldetails;
exports.trackhotel=trackHotel;
