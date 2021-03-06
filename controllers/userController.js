const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const GlobalError = require('../utils/GlobalError');
const factory = require('./CRUDcontroller');

const { getOne, deleteOne, updateOne } = factory;

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUser = catchAsync(async (req, res) => {
  const user = await User.find();
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

/** SECTION GETME Endpoint */
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// SECTION GET singleUser
exports.singleUser = getOne(User);

/** **SECTION ALLOW USER TO UPDATE CURRENT USER NAME and PASSWORD  */
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error f user Post password Date
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new GlobalError(
        `This is not for password Updates. Please use /updatePassword`,
        400
      )
    );
  }
  // 2) Update User Document
  // NOTE FILTER UNWANTED FIELD NAME tHAT ARE NOT ALLOWED TO BE UPDATE BY USER
  const filterBody = filterObj(req.body, 'name', 'email');
  const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});
/** **SECTION ALLOW USER TO DELETE THEIR ACCOUNT BY SETTING ACTIVE TO FALSE */
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not Define please use/signup Instead',
  });
};
exports.singleUser = getOne(User);
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);
