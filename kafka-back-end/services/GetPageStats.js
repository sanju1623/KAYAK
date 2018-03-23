var winston = require('winston');
//winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
//winston.remove(winston.transports.Console);
function handle_request(msg, callback) {
    //winston.remove(winston.transports.File);
     winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    winston.remove(winston.transports.Console);

    var cars_page_count = 0, hotels_page_count = 0,flights_page_count=0, signup_page_count = 0, login_page_count = 0, profile_page_count = 0,payment_page_count = 0;
    var oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 200);
    var res={}
    //find data for last 10 days
    var options = {
        from: oldDate,
        until: new Date,
        limit: 100,
        start: 0,
        order: 'desc',
        fields: ['page_name']
    };
    winston.query(options, function (err, results) {
        if (err) {
            throw err;
        }

        //winston.info("yo yo");


        for(var i = 0 ; i < results.file.length ; i++) {
           // console.log(results.file[i].page_name);
            if (results.file[i].page_name == "Cars_page") {
                cars_page_count++;
            }

            if (results.file[i].page_name == "Hotels_page") {
                hotels_page_count++;
            }

            if (results.file[i].page_name == "Flights_page") {
                flights_page_count++;
            }
            if (results.file[i].page_name == "Profile_page") {
                profile_page_count++;
            }

            if (results.file[i].page_name == "Login_page") {
                login_page_count++;
            }

            if (results.file[i].page_name == "Signup_page") {
                signup_page_count++;
            }
            if (results.file[i].page_name == "Payment_page") {
                payment_page_count++;
            }
        }

         var resArr = [];

         resArr.push([{"label" : "Cars" , "value" : cars_page_count}, {"label" : "Hotels" , "value" : hotels_page_count},{"label" : "Flights" , "value" : flights_page_count},{"label" : "Login" , "value" : login_page_count},{"label" : "Payment" , "value" : payment_page_count},{"label" : "Profile" , "value" : profile_page_count},{"label" : "Signup" , "value" : signup_page_count}]);

        res.code = "200";
        res.value = "Stats Successful";
        res.arr=resArr;
        callback(null, res);
    });

     winston.remove(winston.transports.File);
     winston.add(winston.transports.Console);
}

exports.handle_request = handle_request;