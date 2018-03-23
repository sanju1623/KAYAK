var SqlConPool = require("./SqlConPool");
function handle_request(msg, callback) {
    console.log(msg.username)
    var query = "select category,count(*) as value from paymentdetails group by category;";
    console.log(query)
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
