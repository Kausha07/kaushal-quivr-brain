const router = require('express').Router();
router.post('/', (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Query required' });
  res.json({ query, results: [{ text: 'Relevant chunk', score: 0.92 }] });
});
module.exports = router;
