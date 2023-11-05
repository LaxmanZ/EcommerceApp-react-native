const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

mongoose
  .connect(
    'mongodb+srv://laxmanbhajantri:laxmanbb@cluster0.iazkwfu.mongodb.net/',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error While connecting to MongoDB', err);
  });

app.listen(port, () => {
  console.log('Server is running on Port 8000');
});
