const express = require('express'),
     http = require('http');
//...1.7.d
const morgan = require('morgan');
//...
//...1.7.h
const bodyParser = require('body-parser');
//--------------------------------------------------
const dishRouter = require('./routes/dishRouter');
//. . .

const hostname = 'localhost';
const port = 3000;

const app = express();

//. . .1.7.d
app.use(morgan('dev'));
//. . . 1.7.h
app.use(bodyParser.json());
//. . .

//. . . 1.7.h
//--------------------------------------------------
app.use('/dishes/', dishRouter);
app.use('/dishes/:dishId', dishRouter);
app.all('/dishes', (req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
});

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

//. . .1.7.d
app.use(express.static(__dirname + '/public'));
//. . .
const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
