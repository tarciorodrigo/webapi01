const db = require("../models/userModel");
const userSchema = require("../models/userSchema");

function getUserById(req, res, next) {
  const id = req.params.id;
  const user = db.findUser(id);
  res.status(200).json(user);
}

function getUsers(req, res, next) {
    const users = db.findUsers();
    res.json(users);
}

function postUser(request, response) {
  const { error } = userSchema.validate(request.body);

  if (error)
    return response.status(422).json({ error: error.details });

  const user = db.insertUser(request.body);
  response.status(201).json(user);
}

function putUser(req, res, next) {
  const id = req.params.id;
  const user = db.updateUser(id, req.body);
  res.status(200).json(user);
};

function patchUser(req, res, next) {
  const id = req.params.id;
  const user = db.updatePartialUser(id, req.body);
  res.status(200).json(user);
};

function deleteUser(req, res, next) {
    const id = req.params.id;
    db.deleteUser(id);
    res.status(200).json();
};

module.exports = {
    getUserById,
    getUsers,
    postUser,
    putUser,
    patchUser,
    deleteUser
}