const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/config').get(process.env.NODE_ENV);
const mongoose = require('mongoose');
const server = express();

const bookRouter = require('./router/bookRouter');
const userRouter = require('./router/userRouter');

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

server.use(bodyParser.json());
server.use(cookieParser());
server.use('/api/books', bookRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send({ api: 'Running...' });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Api running on Port: ${port}`);
});
