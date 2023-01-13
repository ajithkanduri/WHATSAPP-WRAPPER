const { reject,resolve } = require('bluebird');
const {twilio_account_sid,twilio_auth_token,twilio_phone_number} = require('./config/serverConfig');
const client = require('twilio')(twilio_account_sid, twilio_auth_token);

/**
 * Sends WhatsApp message to specified phone number with specified message
 * using Twilio API
 * 
 * @param {string} phoneNumber - phone number to send message to
 * @param {string} pingPong - message to send
 * @returns {Promise} resolved with message SID if message is successfully sent,
 *                    rejected with error if there is a problem sending the message
 */
let sendPingPong = (phoneNumber,pingPong,botNumber) =>{
  let from = 'whatsapp:'+botNumber
  let to = 'whatsapp:'+phoneNumber
  return new Promise(function(resolve,reject){
    client.messages
    .create({
       from: from,
       body: pingPong,
       to: to
     })
    .then(pingPongRes =>resolve(pingPongRes.sid))
    .catch(err => reject(err));
  })
}

module.exports.sendPingPong = sendPingPong;
