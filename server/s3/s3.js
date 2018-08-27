const axios = require('axios');
var AWS = require('aws-sdk');
var { accessKeyId, secretAccessKey, apiVersion } = require('./s3_config.js');

var bucketName = 'shepherd-bucket';

// Create a promise on S3 service object
AWS.config.update({
  accessKeyId,
  secretAccessKey,
  apiVersion
});
var s3 = new AWS.S3();

var getSignedUploadUrl = (fileName, cb) => {
  s3.getSignedUrl(
    'putObject',
    {
      Bucket: bucketName,
      Key: fileName,
      ACL: 'authenticated-read', // This must match with your ajax contentType parameter
      ContentType: 'binary/octet-stream'
    },
    cb
  );
};

var getSignedDownloadUrl = (fileName, cb) => {
  s3.getSignedUrl(
    'getObject',
    {
      Bucket: bucketName,
      Key: fileName,
      ResponseContentType: 'image/jpeg'
    },
    cb
  );
};

// Handle promise fulfilled/rejected states
var uploadFile = () => {
  axios
    .put({
      url: uploadPreSignedUrl,
      data: file
    })
    .then(() => {
      console.log('file uploaded!');
    })
    .catch(err => {
      console.log('err: ', err);
    });
};

module.exports = {
  getSignedUploadUrl,
  getSignedDownloadUrl,
  uploadFile
};
