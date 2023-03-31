const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const data = require('./data.json');

app.use(express.json()); // converts all incoming put, patch, post to js objects

app.get('/', (req, res) => {
  res.json('Api is running succesfully...');
});

app.get('/api', (req, res) => {
  res.json(data);
});

app.get('/api/products', (req, res) => {
  res.json(data.products)
});


app.get('/api/products/:id', (req, res) => {
  const db = data.products;
  const product = db.find((x) => x.productId === parseInt(req.params.id));
  res.json(product);
});


app.patch('/api/products/:id', (req, res) => {
  res.json(req.body);

  const db = data.products;
  const productIndex = db.findIndex((x) => x.productId === parseInt(req.params.id));
  db.splice(productIndex, 1, req.body);
})


app.post('/api/products', (req, res) => {
  res.json(req.body);
  data.products.push(req.body);
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

