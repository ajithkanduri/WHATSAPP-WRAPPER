const sqs_queue = require('./config/serverConfig').sqs_url;
const AWS = require('aws-sdk')
AWS.config.update({region: 'ap-south-1'})
const sqs = new AWS.SQS({apiVersion: '2012-11-05'})
var params = {
    QueueUrl: sqs_queue /* required */
  };
  sqs.purgeQueue(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
