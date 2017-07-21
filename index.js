var express = require('express');
var app = express();


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

const mem = [];
app.set('/pipes', function (req, res, next) {
  mem.push(new Uint8Array(50000));
  res.json({hello: "World"})
});
app.set('/clocks', function (req, res, next) {
  const start = new Date().getTime();
  while (new Date().getTime() < start + 100);
  res.json({hello: "World"})
});


// http://buildnewgames.com/garbage-collector-friendly-code/
app.set('/bins', function (req, res, next) {
  const func = () => {
    global.x = new Array(1000);
  }
  for (let i = 0; i < 1000; i++) func();
  res.json({hello: "World"})
});
app.set('/children', function (req, res, next) {
  var exec = require('child_process').exec;
  var cmd = 'sleep 1m';
  exec(cmd, function (error, stdout, stderr) {
    // command output is in stdout
  });
  res.json({hello: "World"})
});
