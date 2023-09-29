import multer from 'multer';

const storageProfile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/images/profile'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const storageDocument = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/images/documents'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const storageProduct = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/images/products'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storageProduct, storageDocument, storageProfile });