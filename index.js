// Index.js
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const Visitor = require('./models/visitor');

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/dbapp/api/visitors', (request, response) => {
  Visitor.find({}).then(visitors => {
    response.json(visitors);
  });
});

app.post('/dbapp/api/visitors', (request, response) => {
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

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});