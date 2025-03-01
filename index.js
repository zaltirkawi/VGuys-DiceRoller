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

// // app.use(cors({
// //     origin: "*", // Allow all origins
// //     methods: ['GET', 'POST', 'PUT', 'DELETE']
// // }));

// // http.createServer(function (request, response) {
// // response.writeHead(200, {
// //     'Content-Type': 'text/plain',
// //     'Access-Control-Allow-Origin' : '*',
// //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
// // });

// const port = process.env.PORT || 1337;
// server.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

var http = require('http');
var url = require('url');
var dt = require('./datetime');
var diceRoller = require('./diceRoller');

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const pathname = parsedUrl.pathname;

    console.log(`Request received: ${request.url}`);

    // CORS Handling
    response.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (Update later for CORS error)
    response.setHeader("Content-Type", "application/json");

    if (pathname === '/roll-dice') {
        // Extract number of sides (default to 6)
        const sides = parsedUrl.query.sides ? parseInt(parsedUrl.query.sides) : 6;
        const result = diceRoller.rollDice(sides);

        response.writeHead(200);
        response.end(JSON.stringify({ roll: result }));
        return;
    }

    // CORS Failure Condition (Intentionally Block Requests)
    if (pathname === "/cors-fail") {
        response.setHeader("Access-Control-Allow-Origin", "http://some-other-site.com"); // Blocks your frontend
        response.writeHead(403); // Forbidden response
        response.end(JSON.stringify({ error: "CORS policy restricts this request" }));
        return;
    }

    // API Test Page
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<h3>Hello! This is your Dice Roller API</h3>');
    response.write("Current date and time: " + dt.myDateTime() + "<br><br>");
    response.write("Test API by adding <code>/roll-dice?sides=6</code> to the URL.");
    response.end();
});

const port = process.env.PORT || 1337;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
