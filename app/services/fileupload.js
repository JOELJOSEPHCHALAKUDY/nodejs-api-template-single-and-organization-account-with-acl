const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const { aws_s3 } = require(__base + "app/config/index");
const path = require("path");

aws.config.update({
  secretAccessKey: aws_s3.key,
  accessKeyId: aws_s3.id,
  region: aws_s3.region // region of your bucket
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  // reject unwanted files
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("File not supported"), false);
  }
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: aws_s3.bucket,
    acl: aws_s3.acl,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      // set the file name with image file
      let file_name = file.originalname.split(".");
      file_name.pop();
      cb(
        null,
        file_name.join("") +
          "_" +
          Date.now().toString() +
          path.extname(file.originalname)
      );
    }
  }),
  fileFilter: fileFilter
});

module.exports = upload;
