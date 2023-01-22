const User = require('../models/user');
const Address = require('../models/address');
const mongoose = require('mongoose');
const { isStrongPassword } = require('validator');
const { hashPassword, comparePassword } = require('../middlewares/bcrypt');

const { generateToken } = require('../middlewares/jsonwebtoken');

const { missingFields } = require('../middlewares/utils');

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, mobileNo } = req.body;
  //check for missing fields
  const missing = missingFields({
    firstName,
    lastName,
    email,
    password,
    mobileNo,
  });
  if (missing.length > 0) {
    return res.status(400).json({
      message: `Missing ${missing.join(', ')}`,
    });
  }

  try {
    //find user by email or mobileNo
    const user = await User.findOne({
      $or: [{ email: email }, { mobileNo: mobileNo }],
    });
    if (user) {
      return res.status(409).json({
        message: 'User already exists',
      });
    }
    //validate password
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character.',
      });
    }

    //hash password
    const hashedPassword = hashPassword(password);
    //create user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      mobileNo,
      password: hashedPassword,
    });
    //generate token
    const token = generateToken(newUser);
    //send response
    return res.status(201).json({
      message: 'User created successfully',
      data: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        mobileNo: newUser.mobileNo,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password, mobileNo } = req.body;
  //check for missing fields
  const check = email || mobileNo;
  const missing = missingFields({
    emailOrmobileNo: check,
    password,
  });
  if (missing.length > 0) {
    return res.status(400).json({
      message: `Missing ${missing.join(', ')}`,
    });
  }

  try {
    //find user by email or mobileNo
    const user = await User.findOne({
      $or: [{ email: email }, { mobileNo: mobileNo }],
    });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    //compare password
    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }
    //generate token
    const token = generateToken(user);
    req.user = user;
    //send response
    return res.status(200).json({
      message: 'User logged in successfully',
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobileNo: user.mobileNo,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    //find user by id
    const { id } = req.params;
    const user = await User.findById(id).populate('address');
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    //send response
    return res.status(200).json({
      message: 'User found',
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobileNo: user.mobileNo,
        address: user.address,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.addAddress = async (req, res) => {
  const { id } = req.params;
  const { address } = req.body;
  //check for missing fields
  const missing = missingFields({
    address,
    id,
  });
  if (missing.length > 0) {
    return res.status(400).json({
      message: `Missing ${missing.join(', ')}`,
    });
  }
  try {
    //find user by id
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    //check if address already exists
    const addressExists = await Address.findOne({
      address,
      user: id,
    });
    if (addressExists) {
      return res.status(409).json({
        message: 'Address already exists',
      });
    }
    const addressPresent = await Address.findOne({
      user: id,
    });
    if (addressPresent) {
      const newAddress = await Address.findOneAndUpdate(
        {
          user: id,
        },
        {
          $push: {
            address,
          },
        },
        {
          new: true,
        }
      );
      user.address.push(mongoose.Types.ObjectId(newAddress.id));
      await user.save();
      return res.status(200).json({
        message: 'Address updated successfully',
        data: {
          id: newAddress.id,
          address: newAddress.address,
        },
      });
    }

    //create address
    const newAddress = await Address.create({
      address,
      user: id,
    });
    //add address to user
    user.address.push(mongoose.Types.ObjectId(newAddress.id));
    await user.save();
    //send response
    return res.status(201).json({
      message: 'Address added successfully',
      data: {
        id: newAddress.id,
        address: newAddress.address,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};