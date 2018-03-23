    var mongo = require("./mongo");
var MongoConPool=require("./MongoConPool");
var mongoURL = "mongodb://localhost:27017/KAYAK";

function handle_request(msg, callback){

    var res = {};
    var i=0;
    try {

        var queryJson={username: msg.username};

        MongoConPool.find('KayakTracking',queryJson,function(err, details){
            if (err) {
                res.code = "401";
                res.value = "UserTracks details fetch unsuccessful";
                callback(null, res);
            }
            else {
                var resArr = [];
                resArr = details.map(function (file) {
                    var detailsJSON = {};
                    //detailsJSON.username=details[i].username;
                    detailsJSON.Pagename = details[i].page;
                    //detailsJSON.sessionid=details[i].sessionid;
                    //detailsJSON.Date=details[i].Date;
var fromDate=new Date(details[i].fromTime);
var toDate=new Date(details[i].toTime);
detailsJSON.seconds=(toDate.getTime()-fromDate.getTime())/1000;
console.log('------JSON-------');
console.log(detailsJSON);
                    console.log('------JSON-------');
                    i++;
                    return detailsJSON;
                });
                res.code = "200";
                res.value = "UserTracks details Successful";
                res.arr=resArr;

                console.log(res);

                callback(null, res);
            }
        });

    }
    catch (e){
        res.code = "401";
        res.value = "UserTracks details fetch unsuccessful";
        callback(null, res);
    }

}

exports.handle_request = handle_request;