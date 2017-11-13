var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ejs' });
});

router.get('/kakao', passport.authenticate('kakao-login'));
router.get('/oauth', passport.authenticate('kakao-login',{
    successRedirect : '/profile',
    failureRedirect : '/'
}));

router.get('/profile',(req,res)=>{
  res.render('profile', { title: 'ejs' });
})

module.exports = router;
