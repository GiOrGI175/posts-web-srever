const { verify } = require('jsonwebtoken');

const validation = (req, res, next) => {
  const accessToken = req.header('accesToekn');

  if (!accessToken) return res.json({ error: 'User not loggined in' });

  try {
    const validation = verify(accessToken, 'importantsecret');

    if (validation) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validation };
