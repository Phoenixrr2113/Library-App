const express = require('express');

const router = express.Router();

const { Book } = require('../models/book.js');

router.get('/api/getBook', (req, res) => {
  let id = req.query.id;

  Book.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });
});

router.get('/', (req, res) => {
  // http://localhost:3001/api/books?skip=0&limit=3&order=asc
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  Book.find()
    .skip(skip)
    .sort({
      _id: order,
    })
    .limit(limit)
    .exec((err, doc) => {
      //exec runs/ execute the function
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
});

router.get('/user_posts', (req, res) => {
  Book.find({ ownerId: req.query.user }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.json(doc);
  });
});

router.post('/', (req, res) => {
  const book = new Book(req.body);
  book.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      post: true,
      bookId: doc._id,
    });
  });
});

router.put('/', (req, res) => {
  Book.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({
      sucess: true,
      doc,
    });
  });
});

router.delete('/', (req, res) => {
  let id = req.query.id;

  Book.findOneAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({ sucess: true, doc });
  });
});

module.exports = router;
