import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_req, file, cb) => {
    const fileName = Date.now() + '-' + file.originalname;

    cb(null, fileName);
  },
});

export const upload = multer({
  storage,
});
