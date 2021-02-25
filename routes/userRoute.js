const express = require('express');

/** ***SECTION IMPORT MY ROUTE HANDLER **** */
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const { signUp, login, forgotPassword, resetPassword } = authController;

const {
  getAllUser,
  createUser,
  singleUser,
  updateUser,
  deleteUser,
} = userController;

/** **SECTION Routing my Router Route *** */
const router = express.Router();
/** ***SECTION  Routing to user  Authentication route SENDIND INFORMATION */
/** ** NOTE WE ONLY NEED TO POST TO THIS ROUTE SO A NEW USER CAN SIGN UP, Login, Reset, Password */
router.post('/signup', signUp);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

/** ***SECTION  We need these route in more of rest format such as the system administrator, Updating, delete, create user ECT */
router.route('/').get(getAllUser).post(createUser);

router.route('/:id').get(singleUser).patch(updateUser).delete(deleteUser);

module.exports = router;
