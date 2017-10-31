var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/allUser', (res, req) => { //모든 유저 조회
  var selects = {
    "userId": 1,
    "userName": 1,
    "markPCBang.pcBangName": 1
  }
  User.find({}).populate({
    path: "markPCBang",
    select: selects
  }).exec((err, users) => {
    if (err) res.status(404).end();
    else if (!users) res.status(403).json({
      message: "no user"
    });
    else res.status(200).json(users);
  });
});

router.post('/user/signUp', (res, req) => { //유저 가입
  var newUser = new User {
    userId: req.body.userId,
    passWd: req.body.passWd,
    userName: req.body.userName,
    age: req.body.age,
    email: req.body.email,
    tel: req.body.tel
  }

  newUser.save((err, user) => {
    if (err) res.status(404).end();
    else if (!user) res.status(403).json({
      message: "no user"
    });
    else res.status(200).json(user);
  });
});

router.get('/user/load/:userId', (res, req) => { //유저 정보 불러오기
  var selects = {
    "userId": 1,
    "userName": 1,
    "age": 1,
    "email": 1,
    "tel": 1,
    "markPCBang.pcBangName": 1
  }
  User.findById(req.params.userId).populate({
    path: "markPCBang",
    select: selects
  }).exec((err, user) => {
    if (err) res.status(404).end();
    else if (!user) res.status(403).json({
      message: "no user"
    });
    else res.status(200).json(user);
  })
});

router.put('/user/update/:userId', (res, req) => { //유저 정보 변경
  var updateUser = {
    userName: req.body.userName,
    age: req.body.age,
    email: req.body.email,
    tel: req.body.tel
  }
  User.findByIdAndUpdate(req.params.userId, {
    $addToSet: updateUser
  }, (err, user) => {
    if (err) res.status(404).end();
    else if (!user) res.status(403).json({
      message: "no user"
    });
    else res.status(200).json(user);
  })
});

router.delete('/user/delete/:userId', (res, req) => { //유저 삭제
  User.findByIdAndRemove(req.params.userId, (err) => {
    if (err) res.status(404).end();
    else res.status(200).json({
      message: "delete sucess!"
    });
  })
});

module.exports = router;
