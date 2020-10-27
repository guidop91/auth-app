const router = require('express').Router();
const verifyToken = require('./verifyToken');

router.get('/', verifyToken, (req, res) => {
  res.json({
    posts: {
      title: 'A beautiful title',
      description: 'You really shouldn\'t be reading this, this is meaningless.'
    }
  })
});

module.exports = router;