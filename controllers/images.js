const S3 = require('aws-sdk/clients/s3');
const mysql = require('mysql');
const uuid = require('uuid/v4');
const { accessKeyId, secretAccessKey, bucket, region } = require('../config').s3Config;
const db = require('../db');

const s3 = new S3({ accessKeyId, secretAccessKey, region });

exports.getImages = async (req, res) => {
  try {
    const { experience_id } = req.params;
    const prepared = `SELECT * 
                      FROM images
                      WHERE experience_id = ?`
    const inserts = [experience_id];
    const query = mysql.format(prepared, inserts);
    const images = await db.query(query);

    res.send({
      success: true,
      images
    });
  } catch(err) {
    res.status(422).send('Error getting images');
  }
}

exports.prepUpload = (req, res) => {
  const { query: { fileType, name } } = req;

  const key = `${uuid()}${getExt(name)}`;
  
  s3.getSignedUrl('putObject', {
    Bucket: bucket,
    ContentType: fileType,
    Key: key
  }, (err, url) => res.send({ success: true, key, url }));
}

function getExt(name) {
  return name.toLowerCase().match(/.[a-z]{3,4}$/)[0];
}
