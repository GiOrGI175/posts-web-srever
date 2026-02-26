const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

router.get('/', async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

router.post('/', async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(Posts);
});

router.get('/:id', async (req, res) => {
  const postId = req.params.id;

  const post = await Posts.findByPk(postId);

  res.json(post);
});

module.exports = router;
