	var chalk = require('chalk');
	console.log(chalk.red('hi'))
	var net = require('net');
	var client = net.Socket();
	client.connect(3000, function() {
		console.log('Connected to Server');
	
		process.stdin.on('readable', function() {
			var chunk = process.stdin.read();
			var userName = process.argv[2];
			if (chunk !== null) {
				client.write(userName + " " + chunk);
				
			}
			
		});

		client.on('data', function(data){
			console.log(chalk.red(data.toString().trim()))
		});

		client.on('end', function() {
			console.log('disconnected from server');
		});
	});