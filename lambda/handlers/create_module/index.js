var AWS = require('aws-sdk');
var s3 = new AWS.S3();

exports.handler = function(event, context) {
  var record = event.Records[0].s3;
  var srcBucket = record.bucket.name;
  var srcKey    = decodeURIComponent(
    record.object.key.replace(/\+/g, ' ')
  );
  var bucketFrom = {
    Bucket: srcBucket,
    Key: srcKey
  };
  console.log(bucketFrom);
  s3.getObject(bucketFrom).on('success', function(response) {
    var packageJson = new Buffer(response.data.Body, 'utf-8');
    console.log(packageJson.toString('utf-8'));
  }).send();
};
