const express = require('express');
const app = express();

const db = require('./models');
const postRouter = require('./routes/Posts.route');
const commentsRouter = require('./routes/Commnts.route');
const UserRouter = require('./routes/Users.route');

app.use(express.json());

app.use('/posts', postRouter);
app.use('/comments', commentsRouter);
app.use('/auth', UserRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('server running on http://localhost:3001');
  });
});
