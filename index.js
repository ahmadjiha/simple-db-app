// Index.js
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const db = require('./modules/apidb');
const Visitor = require('./models/visitor');

function logRequest(request) {
  db.none('INSERT INTO api(method) VALUES($1)', [request.method])
    .then(() => {
      console.log('success')
    })
    .catch(error => {
      console.log('error');
      console.log(error);
    });
}

db.any('SELECT * FROM api WHERE method = $1', ['POST'])
  .then(data => {
    console.log('success')
    console.log(data)
  })
  .catch(error => {
    console.log("connection failed", error)
  });

app.get('/dbapp/', (request, response) => {
  logRequest(request);
  response.send('<h1>Hello World!</h1>');
});

app.get('/dbapp/api/visitors', (request, response) => {
  logRequest(request);
  Visitor.find({}).then(visitors => {
    response.json(visitors);
  });
});

app.post('/dbapp/api/visitors', (request, response) => {
  logRequest(request);
  const body = request.body;

  if (body === undefined) {
    return response.status(400).json({ error: 'content missing' });
  }

  const visitor = new Visitor({
    name: body.name,
    dateVisited: new Date(),
  });

  visitor.save().then(savedVisitor => {
    response.json(savedVisitor);
  });
});

app.get('/dbapp/api/requests', (request, response) => {
  db.any('SELECT * FROM api')
  .then(data => {
    console.log('success');
    console.log(data);
    response.json(data);
  })
  .catch(error => {
    console.log("connection failed", error)
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});