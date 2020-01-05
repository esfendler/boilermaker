const express = require('express')
const app = express();
const morgan = require('morgan');
const path = require('path')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!


app.use(morgan('dev'));

//is this path written right?
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mounts all routes on api
app.use('/api', require('./apiRoutes'));

//it said to put this after all other routes in server entry file
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

//this can go after errorhandling b/c it's not a route
app.listen(port, function () {
  console.log("Knock, knock");
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});
