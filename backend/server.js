import express from 'express';
import data from './data.js';
// var express = require('express');
// const data = require('./data.js');

const app = express();

// Rutas del Api
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

// TODO: DotEnv SERVER_PORT instead of 5000
const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Rutas del Website
app.get('/', (req, res) => {
  res.send('Server is ready');
});
