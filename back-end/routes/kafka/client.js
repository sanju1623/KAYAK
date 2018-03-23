var rpc = new (require('./kafkarpc'))();

//make request to kafka
function make_request(queue_name, msg_payload, callback){
    //console.log('in make request - client.js');
  //  console.log("msg payload -username - in client.js: "+msg_payload.City);
	rpc.makeRequest(queue_name, msg_payload, function(err, response){

		if(err)
			console.error(err);
		else{
			//console.log("response", response);
			callback(null, response);
		}
	});
}

exports.make_request = make_request;
