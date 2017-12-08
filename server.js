'use strict';

// External libraries
const Express = require('express');
const Postgres = require('pg');
const Http = require('http');
const BodyParser = require('body-parser');

// Internal libraries
const Logger = require('./logger.js');

// If connection string does not work, use the following options
// user: 'tbzfogmmoilpca',
// host: 'ec2-54-235-123-153.compute-1.amazonaws.com',
// password: 'd7f90b25e6872a50fe1a50658b7e394effb98a94ad9e23019f1513d8a0a56c2e',
// database: 'd2suvm3bciuag4',
// port: 5432,

// Allows access to Postgres sql. If environmental variable DATABASE_URL exists, that means we are in production.
let dbOptions = {
  user: 'cto',
  password: 'cto',
  database: 'neutro_evo'
};

if (process.env.DATABASE_URL) {
  dbOptions = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  };
}

const client = new Postgres.Client(dbOptions);

// Connect client to postgres. This returns a promise.
let isDatabaseConnected = false;
client.connect().then(() => {
  isDatabaseConnected = true;
}).catch((err) => {
  Logger.logerr(err.toString());
});

// Initializing our server!
// Routers
const app = Express();
app.use(Express.static('public'));

// Whenever client sends a POST req, allows to you to extract data from the POST request.
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/api/weights', (req, response) => {
  response.setHeader('Content-Type', 'application/json');
  const weight1 = req.body.weight1;
  const weight2 = req.body.weight2;

  if (isDatabaseConnected && weight1 && weight2) {
      const qText = 'INSERT INTO weight_matrices(weight1, weight2) VALUES($1, $2)';
      const values = [weight1, weight2];
      client.query(qText, values).then((result) => {
          response.status(200);
          response.send({ message: 'Weight is inserted' });
        }).catch((err) => {
          response.status(500);
          response.send({ error: err });
        });
  } else if (weight1 === undefined || weight2 === undefined) {
    response.status(400);
    response.send({ error: 'Bad request, weights are not provided' });
  } else {
    response.status(500);
    response.send({ error: 'Database is not connected' });
  }
});

app.get('/api/weights/latest', (req, response) => {
  // tells the browser that the response will send a json file not a html file
  response.setHeader('Contect-Type', 'application/json');
  if (isDatabaseConnected) {
    client.query('SELECT * FROM weight_matrices ORDER BY created DESC LIMIT 1').then((result) => {
      let weight1, weight2;
      if (result.rows.length > 0) {
        const row = result.rows[0];
        weight1 = row.weight1;
        weight2 = row.weight2;
    }
      response.status(200);
      response.send({ weight1: weight1, weight2: weight2 });
    });
  } else {
    // 500 is internal server error
    response.status(500);
    response.send({ error: 'Database is not connected' });
  }
});

// Start the server
const httpServer = Http.createServer(app);
httpServer.listen(process.env.PORT || 8000, () => {
  Logger.loginfo("HTTP server is serving and listening on 8000");
});
