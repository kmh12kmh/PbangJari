var express = require('express');
var router = express.Router();
var Ceo = require('../models/ceo')

router.get('/allCeo', (req, res) => { //모든 CEO 조회
  var selects = {
    "ceoId": 1,
    "email": 1
  }

  Ceo.find({}, selects, (err, ceos) => {
    if (err) res.status(404).end();
    else if (!ceos) res.status(403).json({
      message: "no ceo"
    });
    else res.status(200).json(ceos);
  });
});

router.post('/ceo/signUp', (req, res) => { //CEO 가입
  var newCeo = new Ceo({
    ceoId: req.body.ceoId,
    email: req.body.email,
    passWd: req.body.passWd,
    userName: req.body.userName,
    license: req.body.license
  })

  newCeo.save((err, ceo) => {
    if (err) res.status(404).end();
    else if (!ceo) res.status(403).json({
      message: "no ceo"
    });
    else res.status(200).json(ceo);
  });
});

router.get('/ceo/load/:ceoId', (req, res) => { //CEO 정보 불러오기
  var selects = {
    "ceoId": 1,
    "userName": 1,
    "email": 1,
    "license": 1,
  }
  Ceo.findById(req.params.ceoId, (err, ceo) => {
    if (err) res.status(404).end();
    else if (!ceo) res.status(403).json({
      message: "no ceo"
    });
    else res.status(200).json(ceo);
  })
});

router.put('/ceo/update/:ceoId', (req, res) => { //CEO 정보 변경
  var updateCeo = {
    userName: req.body.userName,
    license: req.body.license,
    email: req.body.email
  }
  Ceo.update({
    "_id": req.params.ceoId
  }, {
    $set: updateCeo
  }, (err) => {
    if (err) res.status(404).end();
    else res.status(200).json({
      message: "update sucess"
    });
  })
});

router.delete('/ceo/delete/:ceoId', (req, res) => { //유저 삭제
  console.log(req.params.ceoId)
  Ceo.remove({
    "_id": req.params.ceoId
  }, (err) => {
    if (err) res.status(404).end();
    else res.status(200).json({
      message: "delete sucess!"
    });
  })
});



module.exports = router;
