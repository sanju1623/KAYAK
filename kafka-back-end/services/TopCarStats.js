var SqlConPool = require("./SqlConPool");
function handle_request(msg, callback) {
    console.log(msg.username);
    var query = "select b.company as name,sum(a.amount) as value from paymentdetails a,carbooking b where a.paymentid=b.paymentid group by company;";
    console.log(query);
    SqlConPool.handle_request(query, function (result, error) {
        var res = {};
        if (error) {
            res.code = "400";
            callback(null, res);
        }
        else {

            if (result.length>0) {
                res.code = "200";
                res.arr=result
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
