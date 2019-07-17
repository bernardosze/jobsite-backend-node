/**
 * User Controller.
 * @author: Sagrika Aggarwal.
 */
const express = require('express');

const { logger } = require('../config/logger');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { env } = require('../config/environment');

const userFieldList = [
  'id',
  'name',
  'email',
  'password',
  'role',
];

// Fetch all users
module.exports.getUsers = async () => {
  let data;
  try {
    data = await User.findAll(
      {
        attributes: [...userFieldList],
        raw: true,
      },
    );
  } catch (error) {
    logger.error(`Error fetching Users ${error}`);
    data = { status: '500', type: 'Exception', message: error.message };
  }
  return data;
};

// Fetch a User
module.exports.getUserById = async (userId) => {
  let data;
  try {
    data = await User.findOne(
      {
        where: { id: userId },
        attributes: [...userFieldList],
        raw: true,
      },
    );
  } catch (error) {
    logger.error(`Error fetching a User ${error}`);
    data = { status: '500', type: 'Exception', message: error.message };
  }
  return data;
};

// Fetch a User
module.exports.getUserByEmail = async (email) => {
  let data;
  try {
    data = await User.findOne(
      {
        where: { email },
        attributes: [...userFieldList],
        raw: true,
      },
    );
  } catch (error) {
    logger.error(`Error fetching a User ${error}`);
    data = { status: '500', type: 'Exception', message: error.message };
  }
  return data;
};

// Create a new User @SIGNIN
module.exports.insertUser = async (user) => {
  let data;

  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);
    await User.create({
      name: user.name, email: user.email, password, role: user.role,
    });
    logger.debug(`User successfully created: ${user}`);
    const payload = {
      user: {
        email: user.email,
        password: user.password,
      },
    };

    const token = jwt.sign(
      payload,
      env.JWT_SECRET,
      { expiresIn: 86400 },
    );

    data = {
      status: 200,
      type: 'Success',
      token,
      message: 'User successfully created',

    };
  } catch (error) {
    logger.error(`${error.name} - ${error.message}`);
    logger.error(`Error trying to insert a User: ${JSON.stringify(user)}`);
    logger.error(error);
    data = {
      status: 500, type: 'Exception', name: error.name, message: error.message,
    };
  }
  return data;
};

// Update an existing User
/**
 * @param {tUser} - user
 */
module.exports.updateUser = async (user) => {
  let data;
  try {
    await User.update({

      email: user.email,
      password: user.password,
    }, {
      where: { id: user.id },
    });
    logger.debug(`User successfully updated: ${JSON.stringify(user)}`);
    data = { status: 200, type: 'Success', message: 'User successfully updated.' };
  } catch (error) {
    logger.error(`Error trying to update a User: ${JSON.stringify(user)} -  ${error}`);
    data = { status: 500, type: 'Exception', message: error.message };
  }
  return data;
};

// Delete an existing User
module.exports.deleteUser = async (userId) => {
  let data;
  try {
    await User.destroy({
      where: { id: userId },
    });
    logger.debug(`User successfully deleted: ${JSON.stringify(userId)}`);
    data = { status: 200, message: 'User successfully deleted.' };
  } catch (error) {
    logger.error(`Error trying to delete a User: ${JSON.stringify(userId)} -  ${error}`);
    data = { status: 500, type: 'Exception', message: error.message };
  }
  return data;
};

// Authorize User
module.exports.authUser = async (user) => {
  let data;
  let user1;

  try {
    user1 = await User.findOne(
      {
        where: { email: user.email },
        attributes: ['email', 'password'],
        raw: true,
      },
    );

    if (user1 === null) {
      data = { status: '400', type: 'Error', message: 'Invalid Credentials' };
      return data;
    }

    const isMatch = await bcrypt.compare(user.password, user1.password);

    if (isMatch === false) {
      data = { status: '400', type: 'Error', message: 'Invalid Credentials' };
      return data;
    }


    const payload = {
      user: {
        email: user.email,
        password: user.password,
      },
    };

    const token = jwt.sign(
      payload,
      env.JWT_SECRET,
      { expiresIn: 86400 },
    );

    data = {
      status: 200,
      type: 'Success',
      token,
      message: 'Signin Successfull',

    };
  } catch (error) {
    logger.error(`${error.name} - ${error.message}`);
    logger.error(`Error trying to log in: ${JSON.stringify(user)}`);
    logger.error(error);
    data = {
      status: 500, type: 'Exception', name: error.name, message: error.message,
    };
  }
  return data;
};
