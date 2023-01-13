
const express = require('express');
const app = express();
const port = require('./config/serverConfig').port;
var bodyParser = require('body-parser');

/**
 * Use body-parser to parse request body as either
 * URL-encoded data or JSON, depending on request type
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sendPingPong = require('./sendPingPong').sendPingPong;
const sendSQS = require('./sendSQS').sendSQS;


/**
 * Route for GET / endpoint
 * Sends 'Hello World!' response to client
 */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
 * Route for POST /api/sendPingPong endpoint
 * Calls sendPingPong function with phoneNumber and pingPong from request body
 * Sends response 'true' to client if sendPingPong resolves, or error if it rejects
 */
app.post("/api/sendPingPong", (req, res) => {
    console.log(req.body);
    let {phoneNumber,pingPong,botNumber} = req.body;
    sendPingPong(phoneNumber,pingPong,botNumber).then((sid)=>{
        console.log(sid);
        return res.status(200).send("true");
    }).catch(err =>{
        console.log("Message not sent for phonenumber: "+phoneNumber+" message: "+pingPong);
        console.log(err);
        return res.status(400).send(err);
    });
});

/**
 * Route for POST /api/receivePingPong endpoint
 * Logs Body field from request body to console
 */
app.post("/api/receivePingPong",(req,res)=>{
    console.log(req.body);
    let {Body,From} = req.body;
    let reply = From.split(':')[1]
    console.log(Body);
    console.log(reply);
    sendSQS(Body,reply)
});

// app.post("/api/purgeSQS",(req,res)=>{

// })
/**
 * Start server and listen for requests on specified port
 */
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

module.exports = app;
