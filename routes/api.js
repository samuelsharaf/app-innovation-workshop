var fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/messages', function (req, res, next) {
  setTimeout(() => {
    res.json({hello: "World"})
  }, 500);
});

router.get('/clocks', function (req, res, next) {
  const start = new Date().getTime();
  while (new Date().getTime() < start + 100);
  res.json({hello: "World"})
});

router.get('/atan2/:count', (req, res, next) => {
  let x = 0;
  for (let i = 0; i < req.params.count; i++) {
    x = Math.atan2(Math.random(), Math.random());
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(x));
})

router.get('/rockets', function (req, res, next) {
  throw new Error('Kaboom!');
});

router.get('/beverages', function (req, res, next) {
  console.error("418: I'm a teapot");
  res.status(418).send("I'm a teapot"); // https://en.wikipedia.org/wiki/Hyper_Text_Coffee_Pot_Control_Protocol
});

router.get('/maps', function (req, res, next) {
  process.exit(1);
});

const mem = [];
router.get('/pipes', function (req, res, next) {
  mem.push(new Uint8Array(50000));
  res.json({hello: "World"})
});

// http://buildnewgames.com/garbage-collector-friendly-code/
router.get('/bins', function (req, res, next) {
  const func = () => {
    global.x = new Array(1000);
  }
  for (let i = 0; i < 1000; i++) func();
  res.json({hello: "World"})
});

const handles = [];
router.get('/handles', function (req, res, next) {
  var filename = __dirname + 'package.json';
  var readStream = fs.createReadStream(filename);
  handles.push(readStream);
  res.json({hello: "World"})
});

router.get('/children', function (req, res, next) {
  var exec = require('child_process').exec;
  var cmd = 'sleep 1m';
  exec(cmd, function (error, stdout, stderr) {
    // command output is in stdout
  });
  res.json({hello: "World"})
});

router.get('/custom/:value', function (req, res) {
  newrelic.recordMetric('Custom/MyMetric', req.params.value);
});


module.exports = router;
