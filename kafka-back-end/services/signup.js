var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/login";
var winston = require('winston');
function handle_request(msg, callback){
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    winston.log('info', 'Signup Page Viewed', { page_name : 'Signup_page'});

    var res = {};
    console.log("In handle request of signup:"+ JSON.stringify(msg));

    mongo.connect(mongoURL, function(){
      console.log('Connected to mongo at: ' + mongoURL);
      var coll = mongo.collection('login');

      coll.findOne({username: msg.username}, function(err, user){
          if (user) {
              console.log("User already exists");
              res.code = "500";
              res.value = "failure signup-user already exists";
              console.log("2: "+res.code);
              callback(null, res);

          } else {
            coll.insertOne({username: msg.username, password:msg.password, firstname:msg.firstname ,lastname:msg.lastname},{w: 1}, function(err, user){
                if (user.insertedCount>0) {

                    console.log("document inserted");
                    //res.redirect(201,'/login');
                    res.code = "201";
                    res.value = "Success signup";


                } else {
                    //res.status(400);
                    console.log("document not inserted");
                    res.code = "400";
                    res.value = "failure signup";
                }
                  console.log("1: "+res.code);
                  callback(null, res);
            });
          }

      });


  });
    winston.remove(winston.transports.File);
    winston.add(winston.transports.Console);

}

exports.handle_request = handle_request;
