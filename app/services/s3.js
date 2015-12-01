
const listObjects = (callback) => {
  var params = {
    Bucket: process.env.FILES_BUCKET,
    EncodingType: 'url',
    // Marker: 'STRING_VALUE',
    MaxKeys: 10,
    Prefix: process.env.FILES_KEY,
    Delimiter: '/'
  };
  var bucket = new AWS.S3();
  bucket.listObjects(params, (err, data) => {
    if (err) {
      return callback(err);
    }
    const modules = data.CommonPrefixes.map(m => m.Prefix);
    callback(null, modules);
  });
};

const upload = (file, progress, callback) => {
  const params = {
    Bucket: process.env.UPLOAD_BUCKET,
    Key: process.env.UPLOAD_KEY + file.name,
    ContentType: file.type,
    Body: file
  };
  const bucket = new AWS.S3();
  bucket.upload(params)
    .on('httpUploadProgress', progress)
    .send(callback);
};

export default {
  listObjects,
  upload
};
