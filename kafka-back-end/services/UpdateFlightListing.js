var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('FlightListings');
    var res = {};

        var date = new Date(msg.depttime);
        var  dTime=date.toLocaleString().split(' ');
        var date = new Date(msg.arrivaltime);
        var  aTime=date.toLocaleString().split(' ');

        console.log("------ASSAS------------");
        console.log(date.toLocaleString());
        console.log("------ASASS------------");

       var DepartureDate=msg.departdate.substr(0,10);
       var ArrivalDate=msg.arrivaldate.substr(0,10);
       //var DepartureTime=

    var updateJson={FlightId: msg.FlightId, Operator:msg.Operator, DepartureTime:dTime[1] ,DepartureDate:DepartureDate,ArrivalTime: aTime[1], ArrivalDate:ArrivalDate, Origin:msg.placefrom,Type:msg.stops,Destination:msg.placeto,Economy:msg.economy,FirstClass:msg.firstclass,Business:msg.business};

    coll.update({FlightId: msg.InitialFlightId},{$set : updateJson},function(err, flights) {
                if (flights) {

                    console.log("Flight Listing updated");
                    //res.redirect(201,'/login');
                    res.code = "201";
                    res.value = "Success Flight updation";
                } else {
                    console.log("Flight updation failed");
                    res.code = "400";
                    res.value = "failure Flight updation";
                }
                console.log("1: " + res.code);
                callback(null, res);
            })
})
}

exports.handle_request = handle_request;
