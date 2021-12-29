const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post('/sessionLogin', (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(401).send({ status: 'UNAUTHORIZED REQUEST' })
  }

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  const sessionCookie = 'test';
  const options = { maxAge: expiresIn, httpOnly: true };

  res.cookie('session', sessionCookie, options);
  res.json({ status: 'Success '});
})

app.get('/profile', (req, res) => {
  const sessionCookie = req.cookies.session || '';

  if (sessionCookie !== 'test') {
    return res.status(401).send({ status: 'UNAUTHORIZED REQUEST' })
  }

  return res.send({ name: 'test_name' })

})

app.put('/profile', (req, res) => {
  const sessionCookie = req.cookies.session || '';
  const { name } = req.body;

  if (sessionCookie !== 'test') {
    return res.status(401).send({ status: 'UNAUTHORIZED REQUEST' })
  }

  if (!name) {
    return res.status(500).send({ status: 'Update profile error' })
  }

  return res.send({ status: 'Update profile success' })

})

module.exports = app;