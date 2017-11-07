var express = require('express');
var router = express.Router();
var Pbang = require('../models/pcbang');
var Ceo = require('../models/ceo')
var PCmap = require('../models/pcmap');
var User = require('../models/user');
var ping = require('ping');

router.get('/pcBangStatus/:pcMapId', (req, res) => {  // pc 상태 불러오기 및 상태 저장
  var searchDate = new Date();
  var hosts = [];
  var lastSearch;

  PCmap.findOne({
    "_id": req.params.pcMapId
  }, (err, pcmap) => {
    if (err) res.status(404).end();
    else if (!pcmap) res.status(403).json({
      message: "no map"
    });
    else {
      lastSearch = pcmap.lastSearch
      lastSearch.setSeconds(lastSearch.getSeconds() + 10);
      if (lastSearch > searchDate) {
        res.status(200).json({pcmap, message:"send after 10 seconds"});
      } else {
        pcmap.pcIPArray.forEach((v, i) => {
          ping.sys.probe(v, (isAlive) => {
            var pcStatus = isAlive ? 1 : 0;
            hosts[i] = pcStatus
            if (pcmap.pcIPArray.length == hosts.length) {
              console.log(hosts)
              console.log(pcmap.pcIPArray)
              pcmap.update({
                $set: {
                  "pcFlagArray": hosts,
                  "lastSearch": searchDate
                }
              }, (err) => {
                if (err) res.status(404).end();
                else {
                  PCmap.findOne({
                    "_id": req.params.pcMapId
                  }, (err, pcmap) => {
                    if (err) res.status(404).end();
                    else if (!pcmap) res.status(403).json({
                      message: "no map"
                    });
                    else res.status(200).json(pcmap);
                  })
                }
              })
            }
          });
        })
      }
    }
  });
})


module.exports = router;
