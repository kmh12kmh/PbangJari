var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ejs' });
});

router.get('/kakaotest', function(req, res, next) {
  res.render('kakaotest', { title: 'ejs' });
});

module.exports = router;
