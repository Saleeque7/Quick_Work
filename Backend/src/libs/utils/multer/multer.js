
import multer from 'multer'
import multerS3 from 'multer-s3'
import config from '../../../config/config.js'
import { s3 } from './s3bucket.js'
import path from 'path';

 const s3Storage =  multerS3({
    s3: s3,
    bucket: config.S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
      cb(null, fileName)
    }
  })

  // forimage
function sanitizeFile(file, cb) {
  const fileExts = [".png", ".jpg", ".jpeg", ".gif"];
  const isAllowedExt = fileExts.includes(
      path.extname(file.originalname.toLowerCase())
  );
  const isAllowedMimeType = file.mimetype.startsWith("image/");
  if (isAllowedExt && isAllowedMimeType) {
      return cb(null, true);
  } else {  
      cb("Error: File type not allowed!");
  }
}

export const uploadImage = multer({
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
      sanitizeFile(file, callback)
  },
  limits: {
      fileSize: 1024 * 1024 * 2 
  }
})



// for doc
function sanitizeDocumentFile(file, cb) {
  const allowedFileExts = [".pdf", ".doc", ".docx", ".xls", ".xlsx"];
  const isAllowedExt = allowedFileExts.includes(path.extname(file.originalname.toLowerCase()));
  const allowedTypes = [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
    "application/pdf", 
    "application/vnd.ms-excel", 
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.google-apps.spreadsheet" 
  ];
  const isAllowedMimeType = allowedTypes.includes(file.mimetype);
  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true);
  } else {
    cb("Error: File type not allowed!");
  }
}

export const uploadDocument = multer({
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
    sanitizeDocumentFile(file, callback);
  },
  limits: {
    fileSize: 1024 * 1024 * 10 
  }
});

