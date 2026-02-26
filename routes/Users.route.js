const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { where, json } = require('sequelize');

router.get('/', async (req, res) => {});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
  });

  res.json('SUCCESS');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = Users.findOne({ where: { username: username } });

  if (!username) res.json({ error: 'user dont exist' });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: 'wrong username or password combination' });

    res.json('you logged in');
  });
});

module.exports = router;
