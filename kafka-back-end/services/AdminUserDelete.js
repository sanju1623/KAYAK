var SqlConPool = require("./SqlConPool");
function handle_request(msg, callback) {
    var query = "Delete from kayakusers where username='"+msg.username+"';";
    SqlConPool.handle_request(query, function (result, error) {
        var res = {};
        if (error) {
            res.code = "400";
            callback(null, res);
        }
        else {

            if (result) {
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
