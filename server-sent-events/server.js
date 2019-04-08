//https://www.voorhoede.nl/en/blog/real-time-communication-with-server-sent-events/
//https://habr.com/ru/post/120429/


const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/eventstream', (req, res, next) => {
	res.set({
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	});
	
	setInterval(() => {
		data = {random: Math.random()};
		res.write(`event: message\n`);
		res.write(`data: ${JSON.stringify(data)}\n\n`);
		console.log()
	}, 3000);
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
