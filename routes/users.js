const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const userController = require("../controllers/userController");
const validationMiddleware = require("../middlewares/validationMiddleware");
// create application/json parser
var jsonParser = bodyParser.json()


/* GET users listing. */
router.get('/:id', userController.getUserById);

router.get('/', userController.getUsers);

// Validação sem o middleware
// router.post('/', jsonParser ,(request, response) => {
//   const { error } = userSchema.validate(request.body);

//   if (error)
//     return response.status(422).json({ error: error.details });

//   const user = db.insertUser(request.body);
//   response.status(201).json(user);
// });

router.post('/', jsonParser, validationMiddleware, userController.postUser);

router.put('/:id', jsonParser, validationMiddleware, userController.putUser);

router.patch('/:id', jsonParser, validationMiddleware, userController.patchUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
