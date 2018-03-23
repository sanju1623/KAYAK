var MongoConPool=require("./MongoConPool");
function handle_request(msg, callback){
    var res = {};

    var date = new Date(msg.depttime);
    var  dTime=date.toLocaleString().split(' ');
    var date = new Date(msg.arrivaltime);
    var  aTime=date.toLocaleString().split(' ');

    // console.log("------ASSAS------------");
    // console.log(date.toLocaleString());
    // console.log("------ASASS------------");

    var DepartureDate=msg.departdate.substr(0,10);
    var ArrivalDate=msg.arrivaldate.substr(0,10);



    var queryJson={FlightId: msg.FlightId, Operator:msg.Operator, DepartureTime:dTime[1] ,DepartureDate:DepartureDate,ArrivalTime: aTime[1], ArrivalDate:ArrivalDate, Origin:msg.placefrom,Type:msg.type,Destination:msg.placeto,Economy:msg.economy,FirstClass:msg.firstclass,Business:msg.business};
    MongoConPool.findOne('FlightListings',queryJson, function(err,flight){
            if (flight) {
                console.log("Flight Listing Already Exists");
                res.code = "500";
                res.value = "Flight Listing Already Exists";
                console.log("2: "+res.code);
                callback(null, res);
            } else {
                MongoConPool.insert('FlightListings',queryJson,function(err, flight){
                    if (flight.insertedCount>0) {

                        console.log("New Flight Listing Added");
                        //res.redirect(201,'/login');
                        res.code = "201";
                        res.value = "Success Flight Listing";
                    } else {
                        //res.status(400);
                        console.log("New Flight Listing failed");
                        res.code = "400";
                        res.value = "failure New Flight Listing";
                    }
                    console.log("1: "+res.code);
                    callback(null, res);
                });
            }
        });
}

exports.handle_request = handle_request;
