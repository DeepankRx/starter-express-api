const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./database/connection');
const userRouter = require('./routers/user');
const productRouter = require('./routers/product');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'API endpoint not found',
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));