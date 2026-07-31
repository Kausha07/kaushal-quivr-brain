const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = [];
router.post('/register', async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  users.push({ email: req.body.email, password: hash });
  res.json({ message: 'Registered' });
});
router.post('/login', async (req, res) => {
  const user = users.find(u => u.email === req.body.email);
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ token: jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' }) });
});
module.exports = router;
