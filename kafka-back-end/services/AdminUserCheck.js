var SqlConPool = require("./SqlConPool");
function handle_request(msg, callback) {
    console.log('-------asd--------');
    console.log(msg);
    console.log('---------------');


    if(msg.token==0) {
        var query = '';
        if (msg.username != '' && msg.firstname != '' && msg.lastname != '') {
            query = "select username,firstname,lastname,Address,City,State,phoneNumber,creditcard from kayakusers where username='" + msg.username + "'or firstname='" + msg.firstname + "'or lastname='" + msg.lastname + "';";
        }
        else if (msg.username != '' && msg.firstname != '') {
            query = "select username,firstname,lastname,Address,City,State,phoneNumber,creditcard from kayakusers where username='" + msg.username + "'or firstname='" + msg.firstname + "';";
        }
        else if (msg.username != '' && msg.lastname != '') {
            query = "select username,firstname,lastname,Address,City,State,phoneNumber,creditcard from kayakusers where username='" + msg.username + "'or lastname='" + msg.lastname + "';";
        }
        else if (msg.firstname != '' && msg.lastname != '') {
            query = "select username,firstname,lastname,Address,City,State,phoneNumber,creditcard from kayakusers where firstname='" + msg.firstname + "'or lastname='" + msg.lastname + "';";
        }
        else if (msg.username != '') {
            query = "select username,firstname,lastname,Address,City,State,phoneNumber,creditcard from kayakusers where username='" + msg.username + "';";
        }
        else if (msg.lastname != '') {
            query = "select username,firstname,lastname,Address,City,State,phoneNumber,creditcard from kayakusers where username='" + msg.lastname + "';";
        }
        else if (msg.firstname != '') {
            query = "select username,firstname,lastname,Address,City,State,phoneNumber,creditcard from kayakusers where username='" + msg.firstname + "';";
        }
    }
    else
    {
        query = "select username,firstname,lastname,Address,City,State,phoneNumber,creditcard from kayakusers where username='" + msg.username + "';";
    }
    SqlConPool.handle_request(query, function (result, error) {
        var res = {};
       console.log('-----------ssssssssss-----');
       console.log(result);

        console.log(error);
        console.log('-----------ssssssssss-----');
        if (error) {
            res.code = "400";
            callback(null, res);
        }
        else {

            if (result.length > 0) {
                res.code = "200";
                callback(null, res);
            }
            else {
                res.code = "400";
                callback(null, res);
            }
        }
    });
}

exports.handle_request = handle_request;