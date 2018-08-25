const fs = require('fs');
var AWS = require('aws-sdk');
var { ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require('./s3_config.js');

var bucketName = 'shepherd-bucket';

// Create a promise on S3 service object
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

// Handle promise fulfilled/rejected states
var uploadFile = file =>
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    var uploadPreSignedUrl = s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: file,
      ACL: 'authenticated-read',
      // This must match with your ajax contentType parameter
      ContentType: 'binary/octet-stream'
    });
    const params = {
      Bucket: bucketName,
      Key: file,
      Body: JSON.stringify(data, null, 2)
    };
    s3.upload(params, function(s3Err, data) {
      if (s3Err) throw s3Err;
      console.log(`File uploaded successfully at ${data.Location}`);
    });
  });

uploadFile('Blokus.jpg');

module.exports = {
  uploadFile
};
