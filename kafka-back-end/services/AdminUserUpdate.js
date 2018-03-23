var SqlConPool = require("./SqlConPool");
function handle_request(msg, callback) {
    var query = "update kayakusers set username='"+msg.username+"',firstname='"+msg.firstname+"',lastname='"+msg.lastname+"',Address='"+msg.Address+"',City='"+msg.City+"',State='"+msg.State+"',phoneNumber='"+msg.phoneNumber+"',creditcard='"+msg.creditcard+"' where username='"+msg.usertoedit+"';";
    console.log(query)
    SqlConPool.handle_request(query, function (result, error) {
        var res = {};
        if (error) {
            res.code = "400";
            callback(null, res);
        }
        else {

            if (result) {
                res.code = "204";
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
