var express = require('express');
var router = express.Router();
var PCmap = require('../models/pcmap');

router.get('/allPCmap', (req, res) => { //모든 pcMap 조회
  var pcMapSelects = "totalFloor"
  var pcBangSelects = "pcBangName"

  PCmap.find({}, pcMapSelects).populate("pcBangId", pcBangSelects).exec((err, pcmaps) => {
    if (err) res.status(404).end();
    else if (!pcmaps) res.status(403).json({
      message: "no pcmaps"
    });
    else res.status(200).json(pcmaps);
  })
});

router.post('/pcMap/create/:pcBangId', (req, res) => {  //pcmap 생성
  var mapArray = []
  var newMap = new PCmap({
    "pcBangId": req.params.pcBangId,
    "totalFloor": req.body.totalFloor,
    "eachFloor": mapArray
  })

  newMap.save((err, pcmap) => {
    if (err) res.status(404).end();
    else if (!pcmap) res.status(403).json({
      message: "no map"
    });
    else res.status(200).json(pcmap);
  })
})

router.put('/pcMap/pushMap/:pcMapId', (req, res) => { //pcmap 층 추가
  var newFloor = {
    "pcTableSize.horizontal": req.body.horizontal,
    "pcTableSize.vertical": req.body.vertical,
    "pcPlacement" = req.body.pcPlacement
  }
  PCmap.findOne({
    "_id": req.params.pcMapId
  }, (err, pcmap) => {
    if (err) res.status(404).end();
    else if (!pcmap) res.status(403).json({
      message: "no map"
    });
    else {
      if (pcmap.totalFloor == pcmap.eachFloor.length) res.status(403).json({
        message: "already full floors"
      });
      else {
        pcmap.update({
          $push: {
            "eachFloor": newFloor
          }
        }, (err) => {
          if (err) res.status(404).end();
          else res.status(200).json({
            message: "push sucess"
          })
        })
      }
    }
  })
})

module.exports = router;
