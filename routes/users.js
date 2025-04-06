const express = require('express');
const router = express.Router();
const db = require("../db");

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const user = db.findUser(id);
  console.log(user)
  res.status(200).json(user);
});

router.get('/', (req, res, next) => {
  const users = db.findUsers();
  console.log(users)
  res.status(200).json(users);
});

router.post('/', (request, response) => {
  console.log("corpo1: " + request.body);
  const user = db.insertUser(request.body);
  console.log("corpo2: " + user);
  response.status(201).json(user);
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const user = db.updateUser(id, req.body);
  res.status(200).json(user);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  db.deleteUser(id);
  res.status(200).json();
});


module.exports = router;
