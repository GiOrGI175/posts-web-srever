const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { where } = require('sequelize');
const { validation } = require('../middlewares/auth.middleware');

router.get('/:postId', async (req, res) => {
  const postId = req.params.postId;

  const comments = await Comments.findAll({
    where: {
      PostId: postId,
    },
  });

  res.json(comments);
});

router.post('/', validation, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;

  await Comments.create(comment);

  res.json(comment);
});

router.delete('/:commmentId', validation, async (req, res) => {
  const commentId = req.params.commmentId;

  Comments.destroy({
    where: {
      id: commentId,
    },
  });
});

module.exports = router;
