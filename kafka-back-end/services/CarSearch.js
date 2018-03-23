var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KAYAK";
var MongoConPool=require("./MongoConPool");
var winston = require('winston');
//winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
//winston.remove(winston.transports.Console);

function handle_request(msg, callback){

    //winston.remove(winston.transports.File);
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
//    winston.log('info', 'Car Page Viewed', { page_name : 'Cars_page'});


    var res = {};
    var i=0;
    try {
        console.log("In handle request:" + JSON.stringify(msg));
        var queryJson = {Place: msg.place};
        MongoConPool.find('CarListings', queryJson, function (err, cars) {
            if (err) {
                res.code = "401";
                res.value = "Car details fetch unsuccessful";
                callback(null, res);
            }
            else {
                var resArr = [];
                resArr = cars.map(function (file) {
                    var carsJSON = {};
                    carsJSON.id = cars[i].CarId;
                    carsJSON.carType = cars[i].CarType;
                    carsJSON.carPlace = cars[i].Place;
                    carsJSON.peopleCount = cars[i].People;
                    carsJSON.bagCount = cars[i].Bags;
                    carsJSON.doorCount = cars[i].Doors;
                    carsJSON.carPrice = cars[i].Price;
                    carsJSON.Company=cars[i].Company;
                    i = i + 1;
                    return carsJSON;
                });
                res.code = "200";
                res.value = "CarListing Successful";
                res.arr = resArr;
                //        console.log(resArr);

                if (msg.user!=undefined) {

                    MongoConPool.insert("UserTracking",{username: msg.user,Pagename:"Car Listings",sessionid:msg.sid,Date:new Date()}, function (err, user) {
                        if (user.insertedCount > 0) {


                        } else {

                        }

                    });
                }

                callback(null, res);
            }
        });

    }
    catch (e){
        res.code = "401";
        res.value = "Car details fetch unsuccessful";
        callback(null, res);
    }
    winston.remove(winston.transports.File);
    winston.add(winston.transports.Console);
}

exports.handle_request = handle_request;