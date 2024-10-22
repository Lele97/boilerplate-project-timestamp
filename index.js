// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function(req, res) {  
  try {
    const date = req.params.date;
    
    if ((!isNaN(date) && date.length === 13)) {
      const unixdate = Number(date);
      const date_ = new Date(unixdate);
      res.json({
        "unix": unixdate,
        "utc": date_.toUTCString()
      });
      return;
    }
    
    if (!date || /^\s*$/.test(date)) {
      const dateNow = new Date();
      res.json({
        "unix": dateNow.getTime(),
        "utc": dateNow.toUTCString()
      });
      return;
    }
    
    const date_ = new Date(date);
    if (isNaN(date_.getTime())) {
      throw new Error("Invalid Date");
    }
    
    res.json({
      "unix": date_.getTime(),
      "utc": date_.toUTCString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      "error": "Invalid Date"
    });
  }
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
