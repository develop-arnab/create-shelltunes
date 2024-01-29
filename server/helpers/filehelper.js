"use strict";
// const multer = require('multer');
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESSKEY,
  secretAccessKey: process.env.S3_SECRECT_KEY,
  region: "ap-south-1"
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     console.log("FILE RECEIVED - FILENAME", file);
//     cb(
//       null,
//       new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
//     );
//   }
// });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         console.log("FILE RECEIVED - FILENAME",file)
//         cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
//     }
// });
// const filefilter = (req, file, cb) => {
//     console.log("FILE RECEIVED - FILTER",file)
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg'
//         || file.mimetype === 'image/jpeg' || file.mimetype === 'application/json' ){
//             console.log("FILE RECEIVED - FILTER MIMETYPE", file.mimetype)
//             cb(null, true);
//         }else {
//             cb(null, false);
//         }
// }

// const upload = multer({storage: storage, fileFilter: filefilter});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: `animation-json`,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `Art/${file.originalname}`);
    }
  })
});

module.exports = { upload };
