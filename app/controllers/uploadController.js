const aws = require("aws-sdk");
const { aws_s3 } = require(__base + "app/config/index");
const path = require("path");


module.exports = {


    upload : async (req, res, next) => {
        // check if file is uploaded
        if(!req.body.image) {
            return  res.status(409).json({ message: " Please select a file to upload " });
        }

        aws.config.update({
            secretAccessKey: aws_s3.key,
            accessKeyId: aws_s3.id,
            region: aws_s3.region // region of your bucket
        });
          
        const s3 = new aws.S3();
        let base64 = req.body.image;
        const base64Data = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64')
        const type = base64.split(';')[0].split('/')[1]

        const params = {
            Bucket: aws_s3.bucket,
            Key: 'avatar_' +  Date.now().toString(),
            Body: base64Data,
            ACL: aws_s3.acl,
            ContentEncoding: 'base64', // required
            ContentType: `image/${type}`
        }


        s3.upload(params, (err, data) => {
            if (err) { return res.status(400).json({ message: " File upload failed" }); }
           
             // on success send the file path
            return res.status(200).json({ message: " File is Uploaded", path : data.Location });
            
        });

       
    },

}