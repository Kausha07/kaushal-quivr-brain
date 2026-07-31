const router = require('express').Router();
const multer = require('multer')({ dest: 'uploads/' });
router.post('/', multer.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  res.json({ message: 'Indexed', filename: req.file.originalname });
});
module.exports = router;
