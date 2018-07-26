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
app.use('/dishes', dishRouter);
app.all('/dishes', (req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
});

/////////////////////////////////////////////////////////////////////////////
// THIS PART (not routed) ALLOWS TO INTERACT WITH SINGLE ENTITIES (dishes)
// ... does not work if put inside './router/dishRouter.js' Don't know why...
app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name +
        ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});
//////////////////////////////////////////////////////////////////////////

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
