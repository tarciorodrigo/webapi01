const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const db = require("../models/userModel");
const userSchema = require("../models/userSchema");
const validationMiddleware = require("../middlewares/validationMiddleware");
// create application/json parser
var jsonParser = bodyParser.json()


/* GET users listing. */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const user = db.findUser(id);
  res.status(200).json(user);
});

router.get('/', (req, res, next) => {
  const users = db.findUsers();
  console.log(users)
  res.status(200).json(users);
});

// Validação sem o middleware
// router.post('/', jsonParser ,(request, response) => {
//   const { error } = userSchema.validate(request.body);

//   if (error)
//     return response.status(422).json({ error: error.details });

//   const user = db.insertUser(request.body);
//   response.status(201).json(user);
// });

router.post('/', jsonParser, validationMiddleware ,(request, response) => {
  const { error } = userSchema.validate(request.body);

  if (error)
    return response.status(422).json({ error: error.details });

  const user = db.insertUser(request.body);
  response.status(201).json(user);
});

router.put('/:id', jsonParser, validationMiddleware, (req, res, next) => {
  const id = req.params.id;
  const user = db.updateUser(id, req.body);
  res.status(200).json(user);
});

router.patch('/:id', jsonParser, validationMiddleware, (req, res, next) => {
  const id = req.params.id;
  const user = db.updatePartialUser(id, req.body);
  res.status(200).json(user);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  db.deleteUser(id);
  res.status(200).json();
});

module.exports = router;
