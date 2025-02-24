// var http = require('http');
// var url = require('url');
// var dt = require('./datetime');


// const server = http.createServer((request, response) => {
//     // Write the request to the log. 
//     console.log(request);

//     // Standard Hello World.
//     response.writeHead(200, {'Content-Type': 'text/html'});
//     response.write('<h3>Hello World!</h3>')

//     // Access funcion from a separate JavaScript module.
//     response.write("The date and time are currently: " + dt.myDateTime() + "<br><br>");

//     // Show the url. 
//     response.write("req.url="+request.url+"<br><br>");

//     // Suggest adding something tl the url so that we can parse it. 
//     response.write("Consider adding '/test?year=2017&month=July' to the URL.<br><br>");
//     var q = url.parse(request.url, true).query;
//     var txt = q.year + " " + q.month;
//     response.write("txt="+txt);

//     // Close the response
//     response.end('<h3>The End.</h3>');
// });

// const port = process.env.PORT || 1337;
// server.listen(port);

// console.log("Server running at http://localhost:%d", port);

// var http = require('http');
// var url = require('url');
// var dt = require('./datetime');

// const server = http.createServer((request, response) => {
//     const parsedUrl = url.parse(request.url, true);
//     const pathname = parsedUrl.pathname;

//     console.log(`Request received: ${request.url}`);

//     if (pathname === '/roll-dice') {
//         // Extract number of sides (default to 6)
//         const sides = parsedUrl.query.sides ? parseInt(parsedUrl.query.sides) : 6;
//         const result = Math.floor(Math.random() * sides) + 1;

//         response.writeHead(200, { 'Content-Type': 'application/json' });
//         response.end(JSON.stringify({ roll: result }));
//         return;
//     }

//     // API Test Page
//     response.writeHead(200, { 'Content-Type': 'text/html' });
//     response.write('<h3>Hello! This is your Dice Roller API</h3>');
//     response.write("Current date and time: " + dt.myDateTime() + "<br><br>");
//     response.write("Test API by adding <code>/roll-dice?sides=6</code> to the URL.");
//     response.end();
// });

// const port = process.env.PORT || 1337;
// server.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

var http = require('http');
var url = require('url');
var dt = require('./datetime');
var dice = require('./diceRoller');
const cors = require('cors');
const express = require('express');

const app = express();

const server = http.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*'); // Allow CORS (Adjust as needed)
    response.setHeader('Content-Type', 'application/json');
    
    var q = url.parse(request.url, true);
    
    if (q.pathname === '/api/time') {
        response.end(JSON.stringify({ time: dt.myDateTime() }));
    } else if (q.pathname === '/api/roll-dice') {
        let sides = parseInt(q.query.sides) || 6;
        response.end(JSON.stringify({ result: dice.rollDice(sides) }));
    } else {
        response.writeHead(404);
        response.end(JSON.stringify({ error: 'Endpoint not found' }));
    }
});

app.use(cors({
    origin: "*", // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

const port = process.env.PORT || 1337;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
