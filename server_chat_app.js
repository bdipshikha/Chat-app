
var net = require('net');
var port = 3000;
var clients = [];
var chatHistory = [];
// var j = JSON.stringify(chatHistory);
var server = net.createServer(function(client) {
	clients.push(client);			
	console.log('client connected');
	for (var i = 0; i<chatHistory.length; i++) {
		// client.write("Hello Client "+ chatHistory[i])
		console.log(client.write("Hello Client " + chatHistory[i]))
	}

	client.on('data', function(data) {
		console.log(data.toString())
		for(var i=0; i<clients.length; i++) {
			if ( data.toString().trim() !== null) {
				clients[i].write(data.toString())
			}
		}

		chatHistory.push(data.toString().trim());
		console.log(data.toString().trim())

	function createJson() {

		var j = JSON.stringify(chatHistory);
		var fs = require("fs");

		fs.writeFile("chapp.json", j, function(err){
			if(err) {
				console.log(err)
			}	else {
				console.log('Hmmm')
			}			
		});
		

		var p = JSON.parse(j);
		var fs = require("fs");

		fs.readFile("chapp.json", function(err) {
		if (err) {
			console.log(err)
		} else {
			console.log(p)
		}
	});
	}
	createJson(chatHistory);
	
	});

	client.on('end', function() {
		clients.splice(clients.indexOf(clients), 1);
		console.log('client disconnected');
	});

});

server.listen(port, function() { //'listening' listener
	console.log('listening on port ' + port);
});


		





