var AWS = require('aws-sdk');
const Busboy = require('busboy')
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
// AWS.config.loadFromPath('src/config/config.json');
// AWS.config.getPromisesDependency();

AWS.config.update({ region: 'EU1' });



module.exports = {
    login: async (req, res) => {


        const { access, secret, endpoint, region } = req.body

        s3 = await new AWS.S3({ apiVersion: '2006-03-01', endpoint: endpoint, secretAccessKey: secret, accessKeyId: access, region: region });

        await s3.listBuckets(function (err, data) {
            if (err) {
                throw err;


            } else {

                console.log({ status: "SUCCESS" })
                //   
                res.send({ status: "SUCCESS", buckets: data.buckets })

            }
        })


    },
    upload: async (req, res) => {


        const { secret, access, region, endpoint, bucket_name } = req.body
        var busboy = new Busboy({ headers: req.headers });
        s3 = await new AWS.S3({ apiVersion: '2006-03-01', endpoint: endpoint, secretAccessKey: secret, accessKeyId: access, region: region });

        busboy.on('finish', function () {
            console.log('Upload finished');

            const file = req.files.filetoupload;
            //  console.log(innerfil)
            console.log(file);

            var uploadParams = { Bucket: bucket_name, Key: file.name, Body: file.data };


            s3.upload(uploadParams, function (err, data) {
                if (err) {
                    console.log("Error", err);
                } if (data) {
                    console.log("Upload Success", data.Location);
                    // res.send('upload success')
                }
            });
        });
        req.pipe(busboy);


    },
    listBuckets: async (req, res) => {


        const { secret, access, region, endpoint } = req.body
        s3 = await new AWS.S3({ apiVersion: '2006-03-01', endpoint: endpoint, secretAccessKey: secret, accessKeyId: access, region: region });

        await s3.listBuckets({}, function (err, data) {

            if (err) {
                throw err;
            } else {
                res.send(data)
            }

        })

    },
    listObjects: async (req, res) => {

        const { secret, access, region, endpoint, bucket_name } = req.body
        s3 = await new AWS.S3({ apiVersion: '2006-03-01', endpoint: endpoint, secretAccessKey: secret, accessKeyId: access, region: region });
        s3.listObjects({ Bucket: bucket_name }, function (err, data) {
            if (err) {
                throw err;
            } else {
                res.send(data)
            }
        });

    },
    createBucket: async (req, res) => {

        const { secret, access, region, endpoint, bucket_name } = req.body
        s3 = await new AWS.S3({ apiVersion: '2006-03-01', endpoint: endpoint, secretAccessKey: secret, accessKeyId: access, region: region });
        await s3.createBucket({ Bucket: bucket_name }, function (err, data) {
            if (err) {
                throw err;

            } else {
                res.send(data)
            }

        });
    }
}