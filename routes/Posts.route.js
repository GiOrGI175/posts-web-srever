const express = require('express');
const router = express.Router();
const { Posts } = require('../models');
const { validation } = require('../middlewares/auth.middleware');
const { where } = require('sequelize');

router.get('/', async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

router.post('/', validation, async (req, res) => {
  const { title, postText } = req.body;

  const post = await Posts.create({
    title,
    postText,
    username: req.user.username,
    UserId: req.user.id,
  });

  res.json(post);
});

router.get('/byUserId/:id', async (req, res) => {
  const id = req.params.id;

  const listOfPosts = await Posts.findAll({ where: { UserId: id } });

  res.json(listOfPosts);
});

router.get('/:id', async (req, res) => {
  const postId = req.params.id;

  const post = await Posts.findByPk(postId);

  res.json(post);
});

router.put('/:postId', validation, async (req, res) => {
  const postId = req.params.postId;
  const { title, postText } = req.body;

  await Posts.update(
    { title, postText },
    {
      where: {
        id: postId,
      },
    },
  );

  res.json('UPDATED SUCCESSFULLY');
});

router.delete('/:postId', validation, async (req, res) => {
  const postId = req.params.postId;

  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json('DELETED SUCCESSFULLY');
});

module.exports = router;
