const express = require('express');
const router = express.Router();
const { Likes } = require('../models');
const { validation } = require('../middlewares/auth.middleware');
const { where } = require('sequelize');

router.post('/', validation, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  const found = await Likes.findOne({
    where: { PostId, UserId },
  });

  if (!found) {
    await Likes.create({ PostId, UserId });
    res.json('Liked the Post');
  } else {
    await Likes.destroy({
      where: { PostId, UserId },
    });

    res.json('Unliked the Post');
  }
});

module.exports = router;
