const AWS = require('aws-sdk')
AWS.config.update({region: 'ap-south-1'})
const SQS = new AWS.SQS({apiVersion: '2012-11-05'})
const sqs_queue = require('./config/serverConfig').sqs_url;

let sendSQS = (pingpong,phoneNumber) => {
  const params = {
    MessageBody: JSON.stringify({
        pingpong,
        phoneNumber
      }),
    QueueUrl: sqs_queue,
  }

  SQS.sendMessage(params, (err,result) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(result)
  })
}

module.exports.sendSQS = sendSQS;