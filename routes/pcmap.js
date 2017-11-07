var express = require('express');
var router = express.Router();
var PCmap = require('../models/pcmap');

router.get('/allPCmap', (req, res) => { //모든 pcMap 조회
  var pcMapSelects = "totalFloor"
  var pcBangSelects = "pcBangName"

  PCmap.find({}, (err, pcmaps) => {
    if (err) res.status(404).end();
    else if (!pcmaps) res.status(403).json({
      message: "no pcmaps"
    });
    else res.status(200).json(pcmaps);
  })
});

router.post('/pcMap/create/:pcBangId', (req, res) => { //pcmap 생성
  var mapArray = []
  var newMap = new PCmap({
    "pcBangId": req.params.pcBangId,
    "floor": req.body.floor,
    "pcTableSize.horizontal": req.body.horizontal,
    "pcTableSize.vertical": req.body.vertical,
    "pcNumberArray":req.body.pcNumberArray,
    "pcPlaceArray":req.body.pcPlaceArray,
    "pcIPArray":req.body.pcIPArray,
    "pcFlagArray":req.body.pcFlagArray
  })

  newMap.save((err, pcmap) => {
    if (err) res.status(404).end();
    else if (!pcmap) res.status(403).json({
      message: "no map"
    });
    else res.status(200).json(pcmap);
  })
})

router.get('/pcMap/:pcBangId', (req, res) => { // pcmap 조회
  PCmap.find({
    'pcBangId': req.params.pcBangId
  }, (err, pcmaps) => {
    if (err) res.status(404).end();
    else if (!pcmaps) res.status(403).json({
      message: "no pcmaps"
    });
    else res.status(200).json(pcmaps);
  })
})

router.put('/pcMap/update/:pcMapId', (req, res) => { // pcmap 업데이트
  var updateMap = {
    "floor": req.body.floor,
    "pcTableSize.horizontal": req.body.horizontal,
    "pcTableSize.vertical": req.body.vertical,
    "pcNumberArray":req.body.pcNumberArray,
    "pcPlaceArray":req.body.pcPlaceArray,
    "pcIPArray":req.body.pcIPArray,
    "pcFlagArray":req.body.pcFlagArray
  }

  PCmap.update({
    "_id": req.params.pcMapId
  }, {
    $set: {
      updateMap
    }
  }, (err) => {
    if (err) res.status(404).end();
    else res.status(200).json({
      message: "update sucess"
    });
  })
})

router.delete('/pcMap/delete/:pcMapId', (req, res) => { // pcmap 삭제
  PCmap.remove({
    "_id": req.params.pcMapId
  }, (err) => {
    if (err) res.status(404).end();
    else res.status(200).json({
      message: "delete sucess!"
    });
  })
});

module.exports = router;
