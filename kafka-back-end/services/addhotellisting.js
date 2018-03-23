var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
function addhotel(msg, callback){

    var res = {};
        console.log("In handle request:"+ JSON.stringify(msg));
        mongo.connect(mongoURL, function(){
        var coll = mongo.collection('HotelListings');




        coll.find({hotelId:msg.HotelId}).toArray(function (err,result) {
           // console.log('----------------------------');
           // console.log(result.length);
            //console.log('----------------------------');
        if(result.length==0)
        {
console.log(msg);
            coll.insertOne({hotelId:msg.HotelId,hotelsDateFrom:msg.HotelsDateFrom.substr(0,10),hotelsDateTo:msg.HotelsDateTo.substr(0,10),Name:msg.HotelName,Address:msg.HotelAddress,City:msg.HotelCity,Rooms:{singleRoomPrice:msg.singleRoomPrice,doubleRoomPrice:msg.doubleRoomPrice,suitRoomPrice:msg.suitRoomPrice},State:msg.HotelState,Availability:"Yes",Ratings:'',Reviews:''},function(err, hotel){
                if (hotel.insertedCount>0) {
                   // console.log("inserted into HotelListings");
                    //res.redirect(201,'/login');
                    res.code = "201";
                    res.value = "Success Inserted into hotelLisitng";

                } else {
                    //res.status(400);
                  //  console.log("document not inserted");
                    res.code = "400";
                    res.value = "failure insertion";
                }

                    callback(null, res);
            });

        }
            else
        {
            console.log("document not inserted");
            res.code = "401";
            res.value = "Duplicate record";

            callback(null, res);
        }

        });

    });
}

exports.addhotel = addhotel;
