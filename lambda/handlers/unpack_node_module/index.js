require('dotenv').load();

var env = process.env;

var AWS = require('aws-sdk');
var util = require('util');
var fs = require('fs');
var unzip = require('unzip');

var s3 = new AWS.S3();

// Invoke me
exports.handler = function(event, context) {
  var record = event.Records[0].s3;
  var srcBucket = record.bucket.name;
  var srcKey    = decodeURIComponent(
    record.object.key.replace(/\+/g, ' ')
  );
  var dstBucket = env.DEST_BUCKET;
  var dstKey    = srcKey;
  var bucketFrom = {
    Bucket: srcBucket,
    Key: srcKey
  };

  console.log(srcBucket, srcKey, 'start');

  // Start streaming...
  return s3.getObject(bucketFrom)
    .createReadStream()

    // Unzip stream
    .pipe(unzip.Parse())

    // Each file
    .on('entry', streamToS3)

    // Callback with error
    .on('error', context.fail)

    // Finished uploading
    .on('close', function() {
      console.log(srcBucket, srcKey, 'finished');
      context.done();
    });

  //-- . . . . . . . . . . .

  function streamToS3(entry) {
    var fileName = entry.path;
    var type = entry.type; // File or Directory
    var size = entry.size;

    // Only stream js files and package.json
    var matchesJs = new RegExp('(\.js|package.json)$')
      .test(fileName);

    if (type === 'File' && matchesJs) {
      console.log(fileName, 'uploading');

      // Looks good, send this file
      upload(entry, fileName);
    } else {
      // Discard from memory
      entry.autodrain();
    }
  }

  function upload(entry, fileName) {
    const file = dstKey + '/' + fileName;

    s3.upload({
      Bucket: dstBucket,
      Key: file,
      Body: entry,
      ContentType: 'text/html'
    })

    // Send progress to log enties
    .on('httpUploadProgress', console.log)

    // At the end of the day
    .send(function(err, data) {
      if (err) {
        // Crap!
        return context.fail(err);
      }
      // Yeah!
      console.log(file, 'uploaded');
    });
  }
};
