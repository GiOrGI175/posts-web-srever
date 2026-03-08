const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { where, json } = require('sequelize');
const { sign } = require('jsonwebtoken');
const { validation } = require('../middlewares/auth.middleware');

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

  const user = await Users.findOne({ where: { username } });

  if (!user) {
    return res.json({ error: "User doesn't exist" });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      return res.json({ error: 'Wrong username or password' });
    }

    const accessToken = sign(
      { username: user.username, id: user.id },
      'importantsecret',
    );

    res.json(accessToken);
  });

  router.get('/auth', validation, async (req, res) => {
    res.json(req.user);
  });
});
module.exports = router;
